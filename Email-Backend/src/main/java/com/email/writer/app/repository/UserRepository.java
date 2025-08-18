package com.email.writer.app.repository;

import com.email.writer.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUsername(String username);
    // This method is required to find a user in the database using their email.
    Optional<User> findByEmail(String email);
}