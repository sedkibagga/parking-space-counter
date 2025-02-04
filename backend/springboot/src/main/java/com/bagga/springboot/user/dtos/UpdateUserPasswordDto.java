package com.bagga.springboot.user.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UpdateUserPasswordDto {

    private String oldPassword ;
    private String newPassword ;
    private String confirmPassword ;
}
