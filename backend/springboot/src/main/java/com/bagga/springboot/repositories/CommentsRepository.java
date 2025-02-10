package com.bagga.springboot.repositories;

import com.bagga.springboot.entities.CommentsOfUser;
import com.bagga.springboot.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentsRepository extends JpaRepository<CommentsOfUser,Integer> {
    List<CommentsOfUser> findByUser(User user);
    List<CommentsOfUser> findByUser_FirstNameContainingAndUser_LastNameContaining(String firstName, String lastName);

}
