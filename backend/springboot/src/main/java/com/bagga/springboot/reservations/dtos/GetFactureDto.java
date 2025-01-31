package com.bagga.springboot.reservations.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class GetFactureDto {
    private int zoneId ;
    private String reservation_Time;
    private String reservation_Duration ;
}
