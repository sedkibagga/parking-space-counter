package com.bagga.springboot.reservations.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateReservationResponse {
    private Integer zoneId;
    private String status;
    private String reservation_Time;
    private String reservation_Duration;
    private String total_Amount;
    private Integer userId;
}
