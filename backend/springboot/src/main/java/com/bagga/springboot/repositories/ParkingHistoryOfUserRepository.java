package com.bagga.springboot.repositories;

import com.bagga.springboot.entities.ParkingHistoryOfUser;
import com.bagga.springboot.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ParkingHistoryOfUserRepository extends JpaRepository<ParkingHistoryOfUser, Integer> {
    Optional<List<ParkingHistoryOfUser>> getParkingHistoryOfUserByUser(User user);
}
