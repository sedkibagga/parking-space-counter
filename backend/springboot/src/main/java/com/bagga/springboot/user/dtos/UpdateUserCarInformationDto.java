package com.bagga.springboot.user.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UpdateUserCarInformationDto {
    private String registrationNumber;
    private String model;
    private String color;


}
