package com.bagga.springboot.reservations.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class GetUserCarInformationResponse {

    private Integer id ;
    private String registrationNumber;
    private String model;
    private String color;
    private String imageUri ;
    private Integer userId ;

}
