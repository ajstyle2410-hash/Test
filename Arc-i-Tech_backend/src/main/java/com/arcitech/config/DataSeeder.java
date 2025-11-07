package com.arcitech.config;

import com.arcitech.model.User;
import com.arcitech.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

/**
 * Seeds minimal data for development: creates a Super-Admin user if it does not exist.
 */
@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner seedSuperAdmin() {
        return args -> {
            final String email = "superadmin@arcitech.local";
            final String rawPassword = "Admin@123";

            if (userRepository.existsByEmail(email)) {
                System.out.println("Super-Admin already exists: " + email);
                return;
            }

            User superAdmin = User.builder()
                    .fullName("Super Admin")
                    .email(email)
                    .password(passwordEncoder.encode(rawPassword))
                    .role(User.Role.SUPER_ADMIN)
                    .accessStatus(User.AccessStatus.APPROVED)
                    .programType("ADMIN")
                    .active(true)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            userRepository.save(superAdmin);
            System.out.println("Seeded Super-Admin: " + email + " (password: " + rawPassword + ")");
        };
    }
}
