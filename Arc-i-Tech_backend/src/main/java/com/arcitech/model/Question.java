package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column(columnDefinition = "text")
    private String questionText;

    private String questionType; // SINGLE_CHOICE, MULTIPLE_CHOICE, FREE_TEXT

    private String topic;
}
