package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mentor_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MentorProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mentorProfileId;

    @Column(nullable = false)
    private Long userId;

    @Column(columnDefinition = "text")
    private String bio;

    @Column(columnDefinition = "json")
    private String expertiseTags;

    private String linkedinUrl;
}
