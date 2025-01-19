package com.bagga.springboot.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservedPlaces {
    @Id
    @GeneratedValue
    private Integer id ;
    private Integer zoneId ;
    private String status ;
    private String reservation_Time ;
    private String reservation_Duration ;
    private String total_Amount ;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user ;

}
