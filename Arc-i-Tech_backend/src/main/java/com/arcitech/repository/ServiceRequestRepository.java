package com.arcitech.repository;

import com.arcitech.model.ServiceRequest;
import com.arcitech.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    List<ServiceRequest> findByUser(User user);
    List<ServiceRequest> findByStatus(ServiceRequest.Status status);
}
