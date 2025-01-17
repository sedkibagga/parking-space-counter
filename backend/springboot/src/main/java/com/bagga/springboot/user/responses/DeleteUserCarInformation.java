package com.bagga.springboot.user.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DeleteUserCarInformation {
    private Integer id ;
    private String registrationNumber ;
    private String model ;
    private String color ;
    private Integer userId;
}
