package com.arcitech.repository;

import com.arcitech.model.ChatMessage;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    @Query("SELECT m FROM ChatMessage m " +
           "WHERE m.project.id = :projectId " +
           "AND (:before IS NULL OR m.createdAt < (SELECT m2.createdAt FROM ChatMessage m2 WHERE m2.id = :before)) " +
           "ORDER BY m.createdAt DESC")
    List<ChatMessage> findByProjectIdOrderByCreatedAtDesc(
        @Param("projectId") Long projectId,
        @Param("before") Long before,
        Pageable pageable
    );
}