package com.arcitech.dto;

import lombok.Data;
import java.util.List;

@Data
public class ProjectDTO {
    private Long id;
    private String name;
    private String summary;
    private Integer progressPercentage;
    private String status;
    private boolean highlighted;
    private String clientName;
    private List<TaskDTO> tasks;
}
