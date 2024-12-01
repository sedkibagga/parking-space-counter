package com.bagga.springboot.repositories;

import com.bagga.springboot.entities.ParkingHistoryOfUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkingHistoryOfUserRepository extends JpaRepository<ParkingHistoryOfUser, Integer> {
}
