package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Map;

@Entity
@Table(name = "student_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentProfileId;

    @Column(nullable = false)
    private Long userId;

    @Column(unique = true)
    private String studentIdentifier;

    private String educationLevel;

    @Column(columnDefinition = "json")
    private String interests; // JSON stored as string
}
