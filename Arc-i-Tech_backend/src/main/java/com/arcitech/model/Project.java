package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import  com.arcitech.model.*;
 import jakarta.persistence.Transient;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    private Long clientId;

    @Column(nullable = false)
    private String name;

    @Lob
    private String details;

    @Column(length = 500)
    private String summary;

    private Integer progressPercentage;

    private boolean highlighted;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDate startDate;
    private LocalDate endDate;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private String repoLink;

    private Long projectManagerUserId;

    public enum Status {
        PLANNING, IN_DEVELOPMENT, TESTING, DEPLOYED, ON_HOLD
    }

    // Compatibility: existing code expects getId(), getClient(), getTasks()
    public Long getId() {
        return this.projectId;
    }

    @Transient
    private User client;

    @Transient
    private List<ProjectTask> tasks;

    public User getClient() {
        return this.client;
    }

    public List<ProjectTask> getTasks() {
        return this.tasks;
    }
}
