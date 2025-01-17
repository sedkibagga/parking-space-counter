package com.bagga.springboot.reservations;

import com.bagga.springboot.config.JwtService;
import com.bagga.springboot.entities.ParkingHistoryOfUser;
import com.bagga.springboot.entities.ReservedPlaces;
import com.bagga.springboot.entities.User;
import com.bagga.springboot.repositories.ParkingHistoryOfUserRepository;
import com.bagga.springboot.repositories.ReservedPlacesRepository;
import com.bagga.springboot.repositories.UserRepository;
import com.bagga.springboot.reservations.zoneStatus.ZoneStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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
    public ReservationController(JwtService jwtService, UserRepository userRepository, ParkingHistoryOfUserRepository parkingHistoryOfUserRepository , ReservedPlacesRepository reservedPlacesRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.parkingHistoryOfUserRepository = parkingHistoryOfUserRepository;
        this.reservedPlacesRepository = reservedPlacesRepository;
        for (int i = 0; i <=15; i++) {
            zones.put(i, new ZoneStatus(i, "free"));
        }
    }

    @GetMapping("/permit/occupied")
    public List<ZoneStatus> getOccupiedZones() {
        log.info("Occupied Zones: {}", zones.values().stream()
                .filter(zone -> zone.getStatus().equals("occupied") || zone.getStatus().equals("reserved"))
                .map(zone -> new ZoneStatus(zone.getZoneId() + 1, zone.getStatus()))
                .collect(Collectors.toList()));

        return zones.values().stream()
                .filter(zone -> zone.getStatus().equals("occupied") || zone.getStatus().equals("reserved"))
                .map(zone -> new ZoneStatus(zone.getZoneId()+ 1, zone.getStatus()))
                .collect(Collectors.toList());
    }


    @GetMapping("/permit/free")
    public List<ZoneStatus> getLibreZones() {
        List<ZoneStatus> freeZonesFromCamera = zones.values().stream()
                .filter(zone -> zone.getStatus().equals("free"))
                .map(zone -> new ZoneStatus(zone.getZoneId() + 1, zone.getStatus()))
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
    public ResponseEntity<String> reserveZone(@PathVariable int zoneId , @RequestHeader("Authorization") String authHeader) {
        ZoneStatus zone = zones.get(zoneId);
        if (zone == null || !zone.getStatus().equals("free")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Zone is not available for reservation.");
        }
        String token = authHeader.substring(7);
        String email = this.jwtService.extractUsername(token);
        User user = this.userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        log.info("user: {}", user);
        zone.setStatus("reserved");
        ParkingHistoryOfUser parkingHistoryOfUser = ParkingHistoryOfUser.builder()
                .zoneId(zone.getZoneId())
                .user(user)
                .createdDate(LocalDateTime.now())
                .build();
       ParkingHistoryOfUser savedParkingHistoryOfUser = this.parkingHistoryOfUserRepository.save(parkingHistoryOfUser);
       user.getParkingHistoryOfUsers().add(savedParkingHistoryOfUser);
       this.userRepository.save(user);
        ReservedPlaces reservedPlaces = ReservedPlaces.builder()
                .zoneId(zoneId)
                .status("reserved")
                .build();
        this.reservedPlacesRepository.save(reservedPlaces);
        return ResponseEntity.ok("Zone reserved successfully.");
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

}
