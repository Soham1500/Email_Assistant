package com.email.writer.app.service;

import com.email.writer.app.entity.User;
import com.email.writer.app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    /**
     * Fetch a User entity by Clerk user ID.
     */
    public User getUserById(String userId) {
        return userRepository.findById(userId).orElse(null);
    }

    /**
     * This new method finds a User entity by their email address
     * using the updated UserRepository.
     */
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    /**
     * Ensure demo user exists
     */
    public User createDemoUser() {
        User demoUser = User.builder()
                .id("demo-user-id")
                .email("demo@example.com")
                .username("demo-user")
                .build();
        return userRepository.save(demoUser);
    }

    public void ensureDemoUserExists() {
        if (userRepository.findByUsername("demo-user").isEmpty()) {
            createDemoUser();
        }
    }
}