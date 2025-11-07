package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "intern_applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InternApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicationId;

    private Long programId;
    private Long userId;
    private String status; // Pending, Under_Review, Approved, Rejected

    @Column(columnDefinition = "json")
    private String applicationData;

    private LocalDateTime submittedAt;
}
