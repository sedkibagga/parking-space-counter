package com.bagga.springboot.user.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class LoginUserResponse {
    private Integer id ;
    private String token ;
    private String firstName ;
    private String lastName ;
    private String cin ;
    private String email ;
    private String role;
    private String tel ;


}
