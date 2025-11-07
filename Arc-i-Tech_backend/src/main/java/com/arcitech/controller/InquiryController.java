package com.arcitech.controller;

import com.arcitech.dto.InquiryDTO;
import com.arcitech.model.Inquiry;
import com.arcitech.service.InquiryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

    private final InquiryService inquiryService;

    public InquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    // Public endpoint: customers can submit an inquiry
    @PostMapping
    public ResponseEntity<Inquiry> createInquiry(@Valid @RequestBody InquiryDTO dto) {
        return ResponseEntity.ok(inquiryService.createInquiry(dto));
    }

    // Admin: view all inquiries
    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','SUB_ADMIN')")
    public ResponseEntity<List<InquiryDTO>> getAllInquiries() {
        return ResponseEntity.ok(inquiryService.getAllInquiries());
    }

    // Admin: update inquiry status
    @PutMapping("/{id}/status/{status}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','SUB_ADMIN')")
    public ResponseEntity<InquiryDTO> updateStatus(@PathVariable Long id, @PathVariable String status) {
        return ResponseEntity.ok(inquiryService.updateInquiryStatus(id, status));
    }

    // Admin: delete inquiry
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<String> deleteInquiry(@PathVariable Long id) {
        inquiryService.deleteInquiry(id);
        return ResponseEntity.ok("Inquiry deleted successfully");
    }
}
