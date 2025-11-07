package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "intern_assignments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InternAssignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignmentId;

    private Long userId;
    private Long taskId;
    private Long assignedByUserId;
}
