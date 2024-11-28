package com.bagga.springboot.repositories;

import com.bagga.springboot.entities.UserCarInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInformationRepository extends JpaRepository<UserCarInformation,Integer> {
}
