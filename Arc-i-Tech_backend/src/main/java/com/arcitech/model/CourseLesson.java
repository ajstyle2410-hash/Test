package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "course_lessons")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseLesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lessonId;

    private Long moduleId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "text")
    private String content;

    private String videoUrl;
    private Integer orderIndex;
}
