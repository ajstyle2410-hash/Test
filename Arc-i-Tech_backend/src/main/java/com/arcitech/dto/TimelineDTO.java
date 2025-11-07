package com.arcitech.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimelineDTO {
    private Long id;
    private Long serviceRequestId;
    private String event;
    private String details;
    private LocalDateTime timestamp;
}
