package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "client_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clientProfileId;

    @Column(nullable = false)
    private Long userId;

    private Long clientId; // FK to Clients (organization)

    private String jobTitle;
    private String phoneNumber;
}
