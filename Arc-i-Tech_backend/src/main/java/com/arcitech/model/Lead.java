package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "leads")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leadId;

    private Long inquiryId;
    private String leadName;
    private String email;
    private String status; // New, Contacted, Proposal_Sent, Won, Lost
    private Long assignedToUserId;

    @Column(columnDefinition = "text")
    private String notes;
}
