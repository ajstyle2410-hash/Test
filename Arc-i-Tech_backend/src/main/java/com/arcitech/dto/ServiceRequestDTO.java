package com.arcitech.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServiceRequestDTO {
    private Long id;
    private Long userId;
    private Long serviceId;
    private String serviceName;
    private String status;
    private String details;
    private LocalDateTime requestedAt;
    private Long approvedById;
    private String approvedByName;
    private LocalDateTime approvedAt;
}
