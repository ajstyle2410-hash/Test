package com.arcitech.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class InquiryDTO {
    private Long id;
    private String fullName;
    private String email;
    private String message;
    private String status;
    private LocalDateTime createdAt;
}
