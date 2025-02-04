package com.bagga.springboot.user.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UpdateUserPasswordResponse {
    private String firstName ;
    private String lastName ;
    private String Cin ;
    private String email ;
    private String tel ;
}
