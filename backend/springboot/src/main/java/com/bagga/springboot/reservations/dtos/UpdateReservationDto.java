package com.bagga.springboot.reservations.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateReservationDto {
    private Integer zoneId ;
    private String reservation_Time ;
    private String reservation_Duration ;

}
