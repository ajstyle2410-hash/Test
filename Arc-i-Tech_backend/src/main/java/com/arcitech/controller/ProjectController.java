package com.arcitech.controller;

import com.arcitech.dto.ProjectDTO;
import com.arcitech.dto.TaskDTO;
import com.arcitech.model.Project;
import com.arcitech.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // Get all projects (visible to admins/sub-admins)
    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','SUB_ADMIN')")
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    // Get specific project by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('CUSTOMER','DEVELOPER','SUPER_ADMIN','SUB_ADMIN')")
    public ResponseEntity<ProjectDTO> getProject(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    // Create new project
    @PostMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','SUB_ADMIN')")
    public ResponseEntity<Project> createProject(@Valid @RequestBody ProjectDTO projectDTO) {
        return ResponseEntity.ok(projectService.createProject(projectDTO));
    }

    // Update project
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','SUB_ADMIN')")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @Valid @RequestBody ProjectDTO dto) {
        return ResponseEntity.ok(projectService.updateProject(id, dto));
    }

    // Add a task to project
    @PostMapping("/{projectId}/tasks")
    @PreAuthorize("hasAnyRole('DEVELOPER','SUB_ADMIN','SUPER_ADMIN')")
    public ResponseEntity<TaskDTO> addTask(@PathVariable Long projectId, @Valid @RequestBody TaskDTO dto) {
        return ResponseEntity.ok(projectService.addTaskToProject(projectId, dto));
    }

    // Delete project
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<String> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Project deleted successfully");
    }
}
