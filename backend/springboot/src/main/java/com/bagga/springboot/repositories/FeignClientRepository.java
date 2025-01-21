package com.bagga.springboot.repositories;

import com.bagga.springboot.reservations.zoneStatus.ZoneStatus;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name = "ReservationService", url = "http://localhost:8080")
public interface FeignClientRepository {
    @GetMapping("/api/zones/permit/free")
    List<ZoneStatus> getLibreZones() ;
    @GetMapping("/api/zones/permit/occupied")
    List<ZoneStatus> getOccupiedZones() ;
}
