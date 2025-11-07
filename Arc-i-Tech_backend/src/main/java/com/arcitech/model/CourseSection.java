package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "course_sections")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseSection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sectionId;

    private Long courseId;
    private Long tutorUserId;

    @Column(columnDefinition = "text")
    private String scheduleInfo;

    private Integer maxStudents;
    private LocalDate startDate;
    private LocalDate endDate;
}
