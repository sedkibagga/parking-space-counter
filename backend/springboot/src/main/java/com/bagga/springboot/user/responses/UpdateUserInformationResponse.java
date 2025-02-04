package com.bagga.springboot.user.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UpdateUserInformationResponse {
    private Integer id ;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
}
