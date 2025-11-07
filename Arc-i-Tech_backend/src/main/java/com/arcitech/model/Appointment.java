package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentId;

    private Long serviceId;
    private Long mentorUserId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String status; // Scheduled, Completed, Cancelled
    private String meetingLink;
    @Column(columnDefinition = "text")
    private String notes;
}
