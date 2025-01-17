package com.bagga.springboot.repositories;

import com.bagga.springboot.entities.ReservedPlaces;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservedPlacesRepository extends JpaRepository<ReservedPlaces, Integer> {
   List<ReservedPlaces> findByZoneId(Integer zoneId);
}
