package com.arcitech.repository;

import com.arcitech.model.Project;
import com.arcitech.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByClient(User client);
    List<Project> findByStatus(String status);
}
