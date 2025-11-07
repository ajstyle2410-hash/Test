package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "intern_journals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InternJournal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long journalId;

    private Long userId;
    private Long programId;
    private LocalDate entryDate;

    @Column(columnDefinition = "text")
    private String entryText;

    @Column(columnDefinition = "text")
    private String feedbackText;

    private Long feedbackByUserId;
}
