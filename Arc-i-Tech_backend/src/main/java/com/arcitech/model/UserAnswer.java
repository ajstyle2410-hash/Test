package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_answers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userAnswerId;

    private Long attemptId;
    private Long questionId;
    private Long answerOptionId;

    @Column(columnDefinition = "text")
    private String freeTextAnswer;

    private Boolean isCorrect;
}
