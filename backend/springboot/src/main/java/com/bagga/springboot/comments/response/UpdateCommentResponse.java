package com.bagga.springboot.comments.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UpdateCommentResponse {
    private Integer id ;
    private String comment ;

}
