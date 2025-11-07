package com.arcitech.controller;

import com.arcitech.dto.ServiceRequestDTO;
import com.arcitech.dto.TimelineDTO;
import com.arcitech.model.User;
import com.arcitech.repository.UserRepository;
import com.arcitech.service.ServiceRequestService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/service-requests")
public class ServiceRequestController {

    private final ServiceRequestService requestService;
    private final UserRepository userRepository;

    public ServiceRequestController(ServiceRequestService requestService, UserRepository userRepository) {
        this.requestService = requestService;
        this.userRepository = userRepository;
    }

    private User currentUser() {
        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null) return null;
        return userRepository.findByEmail(auth.getName()).orElse(null);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('CUSTOMER','DEVELOPER')")
    public ResponseEntity<ServiceRequestDTO> createRequest(@Valid @RequestBody ServiceRequestDTO dto) {
        User u = currentUser();
        if (u == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(requestService.createRequest(u.getId(), dto.getServiceId(), dto.getDetails()));
    }

    @GetMapping("/my")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<ServiceRequestDTO>> myRequests() {
        User u = currentUser();
        if (u == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(requestService.getRequestsForUser(u.getId()));
    }

    @GetMapping("/pending")
    @PreAuthorize("hasAnyRole('SUB_ADMIN','SUPER_ADMIN')")
    public ResponseEntity<List<ServiceRequestDTO>> pendingRequests() {
        return ResponseEntity.ok(requestService.getPendingRequests());
    }

    @PostMapping("/{id}/approve")
    @PreAuthorize("hasAnyRole('SUB_ADMIN','SUPER_ADMIN')")
    public ResponseEntity<ServiceRequestDTO> approve(@PathVariable Long id, @RequestParam boolean approve) {
        User u = currentUser();
        if (u == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(requestService.approveRequest(id, u.getId(), approve));
    }

    @GetMapping("/{id}/timeline")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<TimelineDTO>> timeline(@PathVariable Long id) {
        return ResponseEntity.ok(requestService.getTimeline(id));
    }
}
