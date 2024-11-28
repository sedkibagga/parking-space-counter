package com.bagga.springboot.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
public class UserCarInformation {
    @Id
    @GeneratedValue
    private Integer id ;

    private String RegistrationNumber ;

    private String Model ;

    private String Color ;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user ;



}
