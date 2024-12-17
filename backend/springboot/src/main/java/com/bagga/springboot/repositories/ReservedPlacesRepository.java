package com.bagga.springboot.repositories;

import com.bagga.springboot.entities.ReservedPlaces;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservedPlacesRepository extends JpaRepository<ReservedPlaces, Integer> {
}
