package com.arcitech.repository;

import com.arcitech.model.Project;
import com.arcitech.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    // Use explicit JPQL queries to avoid Spring Data parsing issues caused by
    // entity/property name discrepancies or transient helpers.
    @Query("select p from Project p where p.client = :client")
    List<Project> findByClient(@Param("client") User client);

    List<Project> findByStatus(String status);

    @Query("select p from Project p where p.owner = :owner")
    List<Project> findByOwner(@Param("owner") User owner);

    @Query("select p from Project p where p.client.id = :clientId")
    List<Project> findByClientId(@Param("clientId") Long clientId);
}
