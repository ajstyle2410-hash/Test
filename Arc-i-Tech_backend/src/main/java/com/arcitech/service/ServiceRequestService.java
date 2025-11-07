package com.arcitech.service;

import com.arcitech.dto.ServiceDTO;
import com.arcitech.dto.ServiceRequestDTO;
import com.arcitech.dto.TimelineDTO;
import com.arcitech.model.ServiceEntity;
import com.arcitech.model.ServiceRequest;
import com.arcitech.model.TimelineEntry;
import com.arcitech.model.User;
import com.arcitech.repository.ServiceRepository;
import com.arcitech.repository.ServiceRequestRepository;
import com.arcitech.repository.TimelineRepository;
import com.arcitech.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ServiceRequestService {

    private final ServiceRepository serviceRepository;
    private final ServiceRequestRepository requestRepository;
    private final TimelineRepository timelineRepository;
    private final UserRepository userRepository;

    public ServiceRequestService(ServiceRepository serviceRepository,
                                 ServiceRequestRepository requestRepository,
                                 TimelineRepository timelineRepository,
                                 UserRepository userRepository) {
        this.serviceRepository = serviceRepository;
        this.requestRepository = requestRepository;
        this.timelineRepository = timelineRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ServiceRequestDTO createRequest(Long userId, Long serviceId, String details) {
        User user = userRepository.findById(userId).orElseThrow();
        ServiceEntity service = serviceRepository.findById(serviceId).orElseThrow();

        ServiceRequest req = ServiceRequest.builder()
                .user(user)
                .service(service)
                .status(ServiceRequest.Status.PENDING)
                .details(details)
                .requestedAt(LocalDateTime.now())
                .build();
        req = requestRepository.save(req);

        TimelineEntry t = TimelineEntry.builder()
                .serviceRequest(req)
                .event("REQUESTED")
                .details("User requested service: " + service.getName())
                .timestamp(LocalDateTime.now())
                .build();
        timelineRepository.save(t);

        return toDTO(req);
    }

    public List<ServiceRequestDTO> getRequestsForUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return requestRepository.findByUser(user).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<ServiceRequestDTO> getPendingRequests() {
        return requestRepository.findByStatus(ServiceRequest.Status.PENDING).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional
    public ServiceRequestDTO approveRequest(Long requestId, Long approverId, boolean approve) {
        ServiceRequest req = requestRepository.findById(requestId).orElseThrow();
        User approver = userRepository.findById(approverId).orElseThrow();

        if (approve) {
            req.setStatus(ServiceRequest.Status.APPROVED);
            req.setApprovedBy(approver);
            req.setApprovedAt(LocalDateTime.now());
        } else {
            req.setStatus(ServiceRequest.Status.REJECTED);
            req.setApprovedBy(approver);
            req.setApprovedAt(LocalDateTime.now());
        }
        requestRepository.save(req);

        TimelineEntry t = TimelineEntry.builder()
                .serviceRequest(req)
                .event(approve ? "APPROVED" : "REJECTED")
                .details((approve ? "Approved by " : "Rejected by ") + approver.getFullName())
                .timestamp(LocalDateTime.now())
                .build();
        timelineRepository.save(t);

        return toDTO(req);
    }

    public List<TimelineDTO> getTimeline(Long requestId) {
        return timelineRepository.findByServiceRequestIdOrderByTimestampAsc(requestId).stream().map(t -> TimelineDTO.builder()
                .id(t.getId())
                .serviceRequestId(t.getServiceRequest().getId())
                .event(t.getEvent())
                .details(t.getDetails())
                .timestamp(t.getTimestamp())
                .build()).collect(Collectors.toList());
    }

    private ServiceRequestDTO toDTO(ServiceRequest req) {
        return ServiceRequestDTO.builder()
                .id(req.getId())
                .userId(req.getUser() != null ? req.getUser().getId() : null)
                .serviceId(req.getService() != null ? req.getService().getId() : null)
                .serviceName(req.getService() != null ? req.getService().getName() : null)
                .status(req.getStatus() != null ? req.getStatus().name() : null)
                .details(req.getDetails())
                .requestedAt(req.getRequestedAt())
                .approvedById(req.getApprovedBy() != null ? req.getApprovedBy().getId() : null)
                .approvedByName(req.getApprovedBy() != null ? req.getApprovedBy().getFullName() : null)
                .approvedAt(req.getApprovedAt())
                .build();
    }
}
