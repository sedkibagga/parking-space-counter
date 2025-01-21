package com.bagga.springboot.repositories;

import com.bagga.springboot.entities.ReservedPlaces;
import com.bagga.springboot.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservedPlacesRepository extends JpaRepository<ReservedPlaces, Integer> {
   List<ReservedPlaces> findByZoneId(Integer zoneId);
   Optional<List<ReservedPlaces>> findByUser(User user);
}
