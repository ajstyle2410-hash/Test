package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "portfolio_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PortfolioItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long portfolioItemId;

    private Long projectId;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "text")
    private String description;

    private String heroImageUrl;

    @Column(columnDefinition = "json")
    private String technologiesUsed;

    private boolean isFeatured;
    private String publicUrl;
    private LocalDate dateCompleted;
}
