package com.bagga.springboot.reservations.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class GetFactureResponse {
    private int zoneId ;
    private String reservation_Time;
    private String reservation_Duration ;
    private String total_Amount ;
}
