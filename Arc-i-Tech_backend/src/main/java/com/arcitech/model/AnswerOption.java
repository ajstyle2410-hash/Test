package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "answer_options")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnswerOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answerOptionId;

    private Long questionId;

    @Column(columnDefinition = "text")
    private String answerText;

    private Boolean isCorrect = false;
}
