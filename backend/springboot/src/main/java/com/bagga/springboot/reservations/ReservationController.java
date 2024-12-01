package com.bagga.springboot.reservations;

import com.bagga.springboot.config.JwtService;
import com.bagga.springboot.entities.ParkingHistoryOfUser;
import com.bagga.springboot.entities.User;
import com.bagga.springboot.repositories.ParkingHistoryOfUserRepository;
import com.bagga.springboot.repositories.UserRepository;
import com.bagga.springboot.reservations.zoneStatus.ZoneStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/zones")
@Slf4j
public class ReservationController {
    private final Map<Integer, ZoneStatus> zones = new HashMap<>();
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final ParkingHistoryOfUserRepository parkingHistoryOfUserRepository;
    public ReservationController(JwtService jwtService, UserRepository userRepository, ParkingHistoryOfUserRepository parkingHistoryOfUserRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.parkingHistoryOfUserRepository = parkingHistoryOfUserRepository;
        for (int i = 1; i < 11; i++) {
            zones.put(i, new ZoneStatus(i, "free"));
        }
    }

    @GetMapping("/permit/occupied")
    public List<ZoneStatus> getOccupiedZones() {
        log.info("Occupied Zones: {}", zones.values().stream()
                .filter(zone -> zone.getStatus().equals("occupied") || zone.getStatus().equals("reserved"))
                .collect(Collectors.toList()));
        return zones.values().stream()
                .filter(zone -> zone.getStatus().equals("occupied") || zone.getStatus().equals("reserved"))
                .collect(Collectors.toList());
    }


    @GetMapping("/permit/free")
    public List<ZoneStatus> getFreeZones() {
        log.info("Free Zones: {}", zones.values().stream()
                .filter(zone -> zone.getStatus().equals("free"))
                .collect(Collectors.toList()));
        return zones.values().stream()
                .filter(zone-> zone.getStatus().equals("free"))
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
