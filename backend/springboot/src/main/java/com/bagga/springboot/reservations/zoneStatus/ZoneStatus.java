package com.bagga.springboot.reservations.zoneStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ZoneStatus {
    private int zoneId;
    private String status;
}
