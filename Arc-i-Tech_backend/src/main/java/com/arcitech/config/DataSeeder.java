package com.arcitech.config;

import com.arcitech.model.User;
import com.arcitech.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import org.springframework.jdbc.core.JdbcTemplate;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;

/**
 * Seeds minimal data for development: creates a Super-Admin user if it does not exist.
 */
@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JdbcTemplate jdbcTemplate;

    @EventListener(ApplicationReadyEvent.class)
    public void seedUsers() {
        // This runs after the application is fully ready which helps avoid
        // race conditions with schema initialization when using schema.sql
        try {
            if (!isTablePresent("user_profile")) {
                System.err.println("⚠️ 'user_profile' table not found yet — skipping seeding.\n" +
                        "If you expect the table to be created automatically, try running a clean build or apply schema.sql manually.");
                return;
            }
            // Seed Super Admin
            if (!userRepository.existsByEmail("admin@arcitech.com")) {
                User superAdmin = User.builder()
                        .fullName("Super Admin")
                        .email("admin@arcitech.com")
                        .password(passwordEncoder.encode("admin123"))
                        .role(User.Role.SUPER_ADMIN)
                        .accessStatus(User.AccessStatus.APPROVED)
                        .programType("ADMIN")
                        .active(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();
                userRepository.save(superAdmin);
                System.out.println("✅ Created Super Admin: admin@arcitech.com (password: admin123)");
            }

            // Seed Sub Admin
            if (!userRepository.existsByEmail("subadmin@arcitech.com")) {
                User subAdmin = User.builder()
                        .fullName("Sub Admin")
                        .email("subadmin@arcitech.com")
                        .password(passwordEncoder.encode("subadmin123"))
                        .role(User.Role.SUB_ADMIN)
                        .accessStatus(User.AccessStatus.APPROVED)
                        .programType("ADMIN")
                        .active(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();
                userRepository.save(subAdmin);
                System.out.println("✅ Created Sub Admin: subadmin@arcitech.com (password: subadmin123)");
            }

            // Seed Developer
            if (!userRepository.existsByEmail("developer@arcitech.com")) {
                User developer = User.builder()
                        .fullName("Developer")
                        .email("developer@arcitech.com")
                        .password(passwordEncoder.encode("developer123"))
                        .role(User.Role.DEVELOPER)
                        .accessStatus(User.AccessStatus.APPROVED)
                        .programType("DEVELOPMENT")
                        .active(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();
                userRepository.save(developer);
                System.out.println("✅ Created Developer: developer@arcitech.com (password: developer123)");
            }

            // Seed Regular User
            if (!userRepository.existsByEmail("user@arcitech.com")) {
                User user = User.builder()
                        .fullName("Test User")
                        .email("user@arcitech.com")
                        .password(passwordEncoder.encode("user123"))
                        .role(User.Role.CUSTOMER)
                        .accessStatus(User.AccessStatus.APPROVED)
                        .programType("USER")
                        .active(true)
                        .createdAt(LocalDateTime.now())
                        .updatedAt(LocalDateTime.now())
                        .build();
                userRepository.save(user);
                System.out.println("✅ Created User: user@arcitech.com (password: user123)");
            }
        } catch (Exception e) {
            System.err.println("⚠️ Skipping seeding due to DB error: " + e.getMessage());
        }
    }

    private boolean isTablePresent(String tableName) {
        try (Connection conn = jdbcTemplate.getDataSource().getConnection()) {
            DatabaseMetaData meta = conn.getMetaData();
            try (ResultSet rs = meta.getTables(conn.getCatalog(), null, tableName, new String[]{"TABLE"})) {
                return rs.next();
            }
        } catch (Exception e) {
            System.err.println("Error checking table existence: " + e.getMessage());
            return false;
        }
    }
}
