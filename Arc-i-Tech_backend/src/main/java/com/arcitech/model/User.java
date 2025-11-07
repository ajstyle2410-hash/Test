package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_profile")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Enumerated(EnumType.STRING)
    private AccessStatus accessStatus;

    private String programType;
    private boolean active;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public enum Role {
        CUSTOMER, DEVELOPER, SUB_ADMIN, ADMIN, SUPER_ADMIN
    }

    public enum AccessStatus {
        APPROVED, PENDING, REJECTED
    }
}
