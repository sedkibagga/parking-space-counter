package com.bagga.springboot.repositories;

import com.bagga.springboot.entities.User;
import com.bagga.springboot.entities.UserCarInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInformationRepository extends JpaRepository<UserCarInformation,Integer> {
    Optional<UserCarInformation> findByUser(User user);

}
