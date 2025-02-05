package com.bagga.springboot.comments.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class CreateCommentDto {
    private String comment ;
    private Integer userId;
}
