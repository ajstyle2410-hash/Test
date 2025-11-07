package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "quiz_questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizQuestion {
    @EmbeddedId
    private QuizQuestionKey id;

    private Integer orderIndex;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuizQuestionKey implements java.io.Serializable {
        private Long quizId;
        private Long questionId;
    }
}
