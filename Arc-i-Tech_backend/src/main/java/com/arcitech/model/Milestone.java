package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "milestones")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Milestone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long milestoneId;

    private Long projectId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "text")
    private String description;

    private LocalDate dueDate;
    private String status;
}
