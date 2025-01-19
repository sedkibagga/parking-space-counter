package com.bagga.springboot.user.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CreateAdminResponse {
    private String firstName ;
    private String lastName ;
    private String Cin ;
    private String email ;
    private String tel ;
}
