package com.bagga.springboot.reservations.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeleteParkingHistoryByIdResponse {
    private Integer id ;
    private Integer zoneId ;
    private String cin;
    private String email ;
    private String firstName ;
    private String lastName ;
    private LocalDateTime createdDate ;
}
