package com.bagga.springboot.user.responses;

import com.bagga.springboot.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserCarInformationResponse {
    private Integer id ;
    private String RegistrationNumber ;
    private String Model ;
    private String Color ;
    private User user ;
}
