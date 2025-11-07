package com.arcitech.repository;

import com.arcitech.model.ProjectTask;
import com.arcitech.model.Project;
import com.arcitech.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectTaskRepository extends JpaRepository<ProjectTask, Long> {
    List<ProjectTask> findByProject(Project project);
    List<ProjectTask> findByAssignee(User assignee);
    List<ProjectTask> findByStatus(ProjectTask.Status status);
}
