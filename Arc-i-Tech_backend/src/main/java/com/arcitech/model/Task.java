package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;

    private Long projectId;
    private Long milestoneId;
    private Long parentTaskId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "text")
    private String description;

    private Long assigneeUserId;
    private String status;

    private LocalDate startDate;
    private LocalDate dueDate;
    private String priority;
}
