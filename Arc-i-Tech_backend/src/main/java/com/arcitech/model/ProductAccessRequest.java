package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "product_access_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductAccessRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ProductKey productKey;

    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime submittedAt;
    private LocalDateTime decidedAt;
    private String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "decided_by_id")
    private User decidedBy;

    public enum ProductKey { PROJECT_MENTORSHIP, MOCK_INTERVIEWS }
    public enum Status { PENDING, APPROVED, REJECTED }
}
