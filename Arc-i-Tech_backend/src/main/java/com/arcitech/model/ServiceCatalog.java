package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_catalog")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceCatalog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "text")
    private String description;

    @Column(nullable = false)
    private String serviceType; // discriminator: PROJECT, COURSE, MENTORSHIP, ASSESSMENT, INTERNSHIP

    @Column(precision = 10, scale = 2)
    private BigDecimal basePrice;

    private boolean isPublic = true;

    @Column(columnDefinition = "json")
    private String displayAttributes;

    private LocalDateTime createdAt;
}
