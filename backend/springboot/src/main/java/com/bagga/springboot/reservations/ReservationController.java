package com.bagga.springboot.reservations;

import com.bagga.springboot.config.JwtService;
import com.bagga.springboot.entities.ParkingHistoryOfUser;
import com.bagga.springboot.entities.ReservedPlaces;
import com.bagga.springboot.entities.User;
import com.bagga.springboot.repositories.ParkingHistoryOfUserRepository;
import com.bagga.springboot.repositories.ReservedPlacesRepository;
import com.bagga.springboot.repositories.UserRepository;
import com.bagga.springboot.reservations.dtos.CreateReservationDto;
import com.bagga.springboot.reservations.responses.*;
import com.bagga.springboot.reservations.zoneStatus.ZoneStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/zones")
@Slf4j
public class ReservationController {
    private final Map<Integer, ZoneStatus> zones = new HashMap<>();
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final ParkingHistoryOfUserRepository parkingHistoryOfUserRepository;
    private final ReservedPlacesRepository reservedPlacesRepository ;
    private final ReservationService reservationService;
    public ReservationController(JwtService jwtService, UserRepository userRepository, ParkingHistoryOfUserRepository parkingHistoryOfUserRepository , ReservedPlacesRepository reservedPlacesRepository , ReservationService reservationService) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.parkingHistoryOfUserRepository = parkingHistoryOfUserRepository;
        this.reservedPlacesRepository = reservedPlacesRepository;
        this.reservationService = reservationService;
        for (int i = 1; i <=15; i++) {
            zones.put(i, new ZoneStatus(i, "free"));
        }
    }

    @GetMapping("/permit/occupied")
    public List<ZoneStatus> getOccupiedZones() {
        log.info("Zones: {}", zones.values());
        log.info("Occupied Zones: {}", zones.values().stream()
                .filter(zone -> zone.getStatus().equals("occupied") || zone.getStatus().equals("reserved"))
                .map(zone -> new ZoneStatus(zone.getZoneId(), zone.getStatus()))
                .collect(Collectors.toList()));
        log.info("Zones: {}", zones.values());

        return zones.values().stream()
                .filter(zone -> zone.getStatus().equals("occupied") || zone.getStatus().equals("reserved"))
                .map(zone -> new ZoneStatus(zone.getZoneId(), zone.getStatus()))
                .collect(Collectors.toList());
    }


    @GetMapping("/permit/free")
    public List<ZoneStatus> getLibreZones() {
        log.info("Zones: {}", zones.values());
        List<ZoneStatus> freeZonesFromCamera = zones.values().stream()
                .filter(zone -> zone.getStatus().equals("free"))
                .map(zone -> new ZoneStatus(zone.getZoneId() , zone.getStatus()))
                .collect(Collectors.toList());

        List<ReservedPlaces> reservedPlaces = this.reservedPlacesRepository.findAll();

        Set<Integer> reservedZoneIds = reservedPlaces.stream()
                .map(ReservedPlaces::getZoneId)
                .collect(Collectors.toSet());

        return freeZonesFromCamera.stream()
                .filter(zone -> !reservedZoneIds.contains(zone.getZoneId()))
                .collect(Collectors.toList());
    }

    @PostMapping("/reserve/{zoneId}")
    public ResponseEntity<String> reserveZone(
            @PathVariable int zoneId,
            @RequestHeader("Authorization") String authHeader,
            @RequestBody CreateReservationDto createReservationDto) {


        ZoneStatus zone = zones.get(zoneId);
        if (zone == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Zone not found.");
        }


        if (!"free".equals(zone.getStatus())) {
            if ("reserved".equals(zone.getStatus())) {

                List<ReservedPlaces> existingReservations = reservedPlacesRepository.findByZoneId(zoneId);
                if (existingReservations.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Zone is reserved, but no existing reservation found.");
                }


                for (ReservedPlaces reservation : existingReservations) {
                    try {

                        LocalDateTime oldReservationTime = LocalDateTime.parse(reservation.getReservation_Time());
                        int oldReservationDuration = Integer.parseInt(reservation.getReservation_Duration());
                        LocalDateTime oldReservationEndTime = oldReservationTime.plusHours(oldReservationDuration);
                        log.info("Old reservation details: {}", oldReservationEndTime);


                        LocalDateTime newReservationTime = LocalDateTime.parse(createReservationDto.getReservation_Time());
                        int newReservationDuration = Integer.parseInt(createReservationDto.getReservation_Duration());
                        LocalDateTime newReservationEndTime = newReservationTime.plusHours(newReservationDuration);
                        log.info("New reservation details: {}", newReservationEndTime);


                        if (newReservationTime.isBefore(oldReservationEndTime) && newReservationEndTime.isAfter(oldReservationTime)) {
                            log.info("New reservation time overlaps with an existing reservation.");
                            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                    .body("Reservation overlaps with an existing reservation.");
                        }
                    } catch (DateTimeParseException | NumberFormatException e) {
                        log.error("Failed to parse reservation details: {}", e.getMessage(), e);
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                .body("Invalid reservation time or duration format.");
                    }
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Zone is not available for reservation.");
            }
        }


        String token = authHeader.substring(7);
        String email = this.jwtService.extractUsername(token);
        User user = this.userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        log.info("User: {}", user);


        zone.setStatus("reserved");


        ParkingHistoryOfUser parkingHistory = ParkingHistoryOfUser.builder()
                .zoneId(zone.getZoneId())
                .user(user)
                .createdDate(LocalDateTime.now())
                .build();
        this.parkingHistoryOfUserRepository.save(parkingHistory);
        user.getParkingHistoryOfUsers().add(parkingHistory);
        this.userRepository.save(user);


        double pricePerHour = 10.0;
        int reservationDuration;
        try {
            reservationDuration = Integer.parseInt(createReservationDto.getReservation_Duration());
        } catch (NumberFormatException e) {
            log.error("Invalid reservation duration format: {}", createReservationDto.getReservation_Duration(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid reservation duration format.");
        }
        double totalAmount = reservationDuration * pricePerHour;


        ReservedPlaces reservedPlaces = ReservedPlaces.builder()
                .zoneId(zoneId)
                .status("reserved")
                .reservation_Time(createReservationDto.getReservation_Time())
                .reservation_Duration(createReservationDto.getReservation_Duration())
                .total_Amount(String.format("%.2f", totalAmount))
                .user(user)
                .build();
        this.reservedPlacesRepository.save(reservedPlaces);


        return ResponseEntity.ok("Zone reserved successfully. Total amount: " + reservedPlaces.getTotal_Amount());
    }

    @PostMapping("/updateStatus/{zoneId}")
    public ResponseEntity<String> updateZoneStatus(@PathVariable int zoneId, @RequestParam String status) {
        ZoneStatus zone = zones.get(zoneId);
        if (zone == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid zone ID.");
        }
        zone.setStatus(status);
        log.info("Zone {} status updated to {}", zoneId, status);
        return ResponseEntity.ok("Zone status updated successfully.");
    }

    @DeleteMapping("/deleteReservation/{id}")
    public DeletReservationResponse deleteReservation(@PathVariable Integer id) {
        return this.reservationService.deleteReservation(id) ;
    }

    @GetMapping("/getReservations")
    public List<GetReservationResponse> getReservations() {
        return this.reservationService.getReservations();
    }

    @GetMapping("/getReservationByUserId/{id}")
    public List<GetReservationByUserId> getReservationByUserId(@PathVariable Integer id) {
        return this.reservationService.getReservationByUserId(id) ;
    }

    @GetMapping("/getParkingHistoryByUserIds/{id}")
    public List<GetParkingHistoryByUserId> getParkingHistoryByUserId(@PathVariable Integer userId) {
        return this.reservationService.getParkingHistoryByUserIds(userId) ;
    }
    @DeleteMapping("/deleteParkingHistoryById/{id}")
    public DeleteParkingHistoryByIdResponse deleteParkingHistoryById(@PathVariable Integer id) {
        return this.reservationService.deleteParkingHistoryById(id) ;
    }







}
