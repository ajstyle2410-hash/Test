package com.arcitech.service;

import com.arcitech.dto.ProjectDTO;
import com.arcitech.dto.TaskDTO;
import com.arcitech.model.Project;
import com.arcitech.model.ProjectTask;
import com.arcitech.model.User;
import com.arcitech.repository.ProjectRepository;
import com.arcitech.repository.ProjectTaskRepository;
import com.arcitech.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectTaskRepository taskRepository;
    private final UserRepository userRepository;

    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ProjectDTO getProjectById(Long id) {
        return projectRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public Project createProject(ProjectDTO dto) {
        User client = userRepository.findByEmail(dto.getClientName())
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Project project = Project.builder()
                .name(dto.getName())
                .summary(dto.getSummary())
                .progressPercentage(dto.getProgressPercentage())
                .status(Project.Status.valueOf(dto.getStatus()))
                .highlighted(dto.isHighlighted())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .client(client)
                .build();

        return projectRepository.save(project);
    }

    public Project updateProject(Long id, ProjectDTO dto) {
        Project existing = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        existing.setName(dto.getName());
        existing.setSummary(dto.getSummary());
        existing.setProgressPercentage(dto.getProgressPercentage());
        existing.setStatus(Project.Status.valueOf(dto.getStatus()));
        existing.setHighlighted(dto.isHighlighted());
        existing.setUpdatedAt(LocalDateTime.now());

        return projectRepository.save(existing);
    }

    public TaskDTO addTaskToProject(Long projectId, TaskDTO dto) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User assignee = userRepository.findByEmail(dto.getAssigneeName())
                .orElseThrow(() -> new RuntimeException("Assignee not found"));

        ProjectTask task = ProjectTask.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .priority(ProjectTask.Priority.valueOf(dto.getPriority()))
                .status(ProjectTask.Status.valueOf(dto.getStatus()))
                .assignee(assignee)
                .project(project)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        ProjectTask saved = taskRepository.save(task);
        return toTaskDTO(saved);
    }

    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id))
            throw new RuntimeException("Project not found");
        projectRepository.deleteById(id);
    }

    // --- Helper mappers ---
    private ProjectDTO toDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setName(project.getName());
        dto.setSummary(project.getSummary());
        dto.setProgressPercentage(project.getProgressPercentage());
        dto.setStatus(project.getStatus().name());
        dto.setHighlighted(project.isHighlighted());
        dto.setClientName(project.getClient() != null ? project.getClient().getEmail() : null);
        dto.setTasks(project.getTasks() != null
                ? project.getTasks().stream().map(this::toTaskDTO).collect(Collectors.toList())
                : null);
        return dto;
    }

    private TaskDTO toTaskDTO(ProjectTask task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setPriority(task.getPriority().name());
        dto.setStatus(task.getStatus().name());
        dto.setAssigneeName(task.getAssignee() != null ? task.getAssignee().getEmail() : null);
        return dto;
    }
}
