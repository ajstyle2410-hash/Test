package com.arcitech.repository;

import com.arcitech.model.ServiceRequest;
import com.arcitech.model.TimelineEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimelineRepository extends JpaRepository<TimelineEntry, Long> {
    List<TimelineEntry> findByServiceRequestIdOrderByTimestampAsc(Long serviceRequestId);
}
