package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "inquiries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inquiryId;

    private String fullName;
    private String email;
    private String phone;
    private String company;

    @Lob
    private String message;

    private String source;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    public enum Status {
        NEW, IN_DISCUSSION, QUOTED, WON, LOST, CLOSED
    }

    // Compatibility helper for existing services that call getId()
    public Long getId() {
        return this.inquiryId;
    }
}
