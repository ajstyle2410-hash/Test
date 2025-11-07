package com.arcitech.controller;

import com.arcitech.dto.ServiceDTO;
import com.arcitech.model.ServiceEntity;
import com.arcitech.repository.ServiceRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceRepository serviceRepository;

    public ServiceController(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @GetMapping
    public ResponseEntity<List<ServiceDTO>> listServices() {
        List<ServiceDTO> list = serviceRepository.findAll().stream().map(s -> ServiceDTO.builder()
                .id(s.getId())
                .name(s.getName())
                .description(s.getDescription())
                .category(s.getCategory())
                .build()).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','SUB_ADMIN')")
    public ResponseEntity<ServiceDTO> createService(@Valid @RequestBody ServiceDTO dto) {
        ServiceEntity s = ServiceEntity.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .category(dto.getCategory())
                .createdAt(LocalDateTime.now())
                .build();
        s = serviceRepository.save(s);
        dto.setId(s.getId());
        return ResponseEntity.ok(dto);
    }
}
