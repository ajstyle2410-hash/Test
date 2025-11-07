package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "internship_programs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InternshipProgram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long programId;

    private Long serviceId;

    private String title;

    @Column(columnDefinition = "text")
    private String description;

    private LocalDate applicationStartDate;
    private LocalDate applicationEndDate;
    private LocalDate programStartDate;
    private LocalDate programEndDate;
}
