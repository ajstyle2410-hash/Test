package com.arcitech.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NotificationDTO {
    private Long id;
    private String title;
    private String message;
    private boolean read;
    private String type;
    private LocalDateTime createdAt;
}
