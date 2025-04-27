package com.bagga.springboot.reservations;

import com.bagga.springboot.entities.ReservedPlaces;
import com.bagga.springboot.entities.User;
import com.bagga.springboot.repositories.ReservedPlacesRepository;
import com.bagga.springboot.repositories.UserRepository;
import com.bagga.springboot.reservations.dtos.CreateReservationDto;
import com.bagga.springboot.reservations.responses.CreateReservationResponse;
import com.bagga.springboot.reservations.zoneStatus.ZoneStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

// ReservationWebSocketController.java
@Controller
@Slf4j
public class ReservationWebSocketController {

    private final Map<Integer, ZoneStatus> zones = new ConcurrentHashMap<>();
    private final UserRepository userRepository;
    private final ReservedPlacesRepository reservedPlacesRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public ReservationWebSocketController(
            UserRepository userRepository,
            ReservedPlacesRepository reservedPlacesRepository,
            SimpMessagingTemplate messagingTemplate) {

        this.userRepository = userRepository;
        this.reservedPlacesRepository = reservedPlacesRepository;
        this.messagingTemplate = messagingTemplate;

        for (int i = 1; i <= 7; i++) {
            zones.put(i, new ZoneStatus(i, "free"));
        }
    }

    @MessageMapping("/zones/reserve")
    @SendToUser("/queue/private/reservations")
    public CreateReservationResponse reserveZone(
            @Payload CreateReservationDto reservationDto,
            @Header("zoneId") int zoneId,
            Principal principal) {

        ZoneStatus zone = zones.get(zoneId);
        if (zone == null) {
            throw new IllegalArgumentException("Zone not found");
        }

        if (!"free".equals(zone.getStatus())) {
            if ("reserved".equals(zone.getStatus())) {
                checkReservationOverlap(zoneId, reservationDto);
            } else {
                throw new IllegalArgumentException("Zone is not available for reservation");
            }
        }

        User user = userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        zone.setStatus("reserved");
        zones.put(zoneId, zone);

        double totalAmount = calculateReservationPrice(reservationDto.getReservation_Duration());

        ReservedPlaces reservation = saveReservation(zoneId, user, reservationDto, totalAmount);

        messagingTemplate.convertAndSend("/topic/zones/status", zones.values());

        return CreateReservationResponse.builder()
                .zoneId(zoneId)
                .status("reserved")
                .reservation_Time(reservationDto.getReservation_Time())
                .reservation_Duration(reservationDto.getReservation_Duration())
                .total_Amount(String.format("%.2f", totalAmount))
                .userId(user.getId())
                .build();
    }

    @MessageMapping("/zones/request/occupied")
    @SendTo("/topic/zones/occupied")
    public List<ZoneStatus> sendOccupiedZones() {
        return filterZonesByStatus("occupied", "reserved");
    }

    @MessageMapping("/zones/request/free")
    @SendTo("/topic/zones/free")
    public List<ZoneStatus> sendFreeZones() {
        List<ZoneStatus> freeZones = filterZonesByStatus("free");
        Set<Integer> reservedZoneIds = reservedPlacesRepository.findAll().stream()
                .map(ReservedPlaces::getZoneId)
                .collect(Collectors.toSet());

        return freeZones.stream()
                .filter(zone -> !reservedZoneIds.contains(zone.getZoneId()))
                .collect(Collectors.toList());
    }

    private List<ZoneStatus> filterZonesByStatus(String... statuses) {
        return zones.values().stream()
                .filter(zone -> Arrays.asList(statuses).contains(zone.getStatus()))
                .collect(Collectors.toList());
    }

    private double calculateReservationPrice(String duration) {
        try {
            return Integer.parseInt(duration) * 10.0;
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid duration format");
        }
    }

    private ReservedPlaces saveReservation(int zoneId, User user, CreateReservationDto dto, double totalAmount) {
        ReservedPlaces reservation = new ReservedPlaces();
        reservation.setZoneId(zoneId);
        reservation.setStatus("reserved");
        reservation.setReservation_Time(dto.getReservation_Time());
        reservation.setReservation_Duration(dto.getReservation_Duration());
        reservation.setTotal_Amount(String.format("%.2f", totalAmount));
        reservation.setUser(user);
        return reservedPlacesRepository.save(reservation);
    }

    private void checkReservationOverlap(int zoneId, CreateReservationDto newReservation) {
        List<ReservedPlaces> existing = reservedPlacesRepository.findByZoneId(zoneId);
        if (existing.isEmpty()) {
            throw new IllegalArgumentException("Zone is reserved but no reservation found");
        }

        LocalDateTime newStart = LocalDateTime.parse(newReservation.getReservation_Time());
        LocalDateTime newEnd = newStart.plusHours(Integer.parseInt(newReservation.getReservation_Duration()));

        for (ReservedPlaces res : existing) {
            LocalDateTime oldStart = LocalDateTime.parse(res.getReservation_Time());
            LocalDateTime oldEnd = oldStart.plusHours(Integer.parseInt(res.getReservation_Duration()));

            if (newStart.isBefore(oldEnd) && newEnd.isAfter(oldStart)) {
                throw new IllegalArgumentException("Reservation time overlaps with existing reservation");
            }
        }
    }

    public void updateZoneStatus(int zoneId, String status) {
        ZoneStatus zone = zones.get(zoneId);
        if (zone != null) {
            zone.setStatus(status);
            zones.put(zoneId, zone);
            messagingTemplate.convertAndSend("/topic/zones/status", zones.values());
        }
    }
}