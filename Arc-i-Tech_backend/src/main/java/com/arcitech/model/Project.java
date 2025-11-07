package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import  com.arcitech.model.*;
 import jakarta.persistence.Transient;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import com.arcitech.model.User;

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

    // removed explicit clientId field to avoid duplicate physical column mapping with the
    // `client` association (both referenced the same physical column `client_id`).
    // Use getClientId() transient helper below when the raw id is required.

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
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    public enum Status {
        PLANNING, IN_DEVELOPMENT, TESTING, DEPLOYED, ON_HOLD
    }

    // Compatibility: existing code expects getId(), getClient(), getTasks()
    public Long getId() {
        return this.projectId;
    }

    @ManyToOne(optional = true)
    @JoinColumn(name = "client_id")
    private User client;

    @Transient
    private List<ProjectTask> tasks;

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public List<ProjectTask> getTasks() {
        return this.tasks;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    @Transient
    public Long getClientId() {
        return this.client != null ? this.client.getId() : null;
    }
}
