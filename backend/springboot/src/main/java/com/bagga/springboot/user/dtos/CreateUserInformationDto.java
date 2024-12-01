package com.bagga.springboot.user.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserInformationDto {
    private String RegistrationNumber ;
    private String Model ;
    private String Color ;
    private Integer userId;
}
