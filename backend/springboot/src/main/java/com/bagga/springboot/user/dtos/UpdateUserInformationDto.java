package com.bagga.springboot.user.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UpdateUserInformationDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
}
