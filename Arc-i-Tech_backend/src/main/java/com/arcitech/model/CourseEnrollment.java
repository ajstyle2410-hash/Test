package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "course_enrollments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseEnrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long enrollmentId;

    private Long userId;
    private Long courseId;
    private Long sectionId;

    private LocalDateTime enrollmentDate;

    @Column(columnDefinition = "json")
    private String progress;

    private String grade;
}
