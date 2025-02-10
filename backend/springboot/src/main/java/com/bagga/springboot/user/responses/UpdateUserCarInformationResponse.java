package com.bagga.springboot.user.responses;

import com.bagga.springboot.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UpdateUserCarInformationResponse {
    private Integer id;
    private String registrationNumber;
    private String  model;
    private String color;
    private Integer userId;
    private String imageUri;
}
