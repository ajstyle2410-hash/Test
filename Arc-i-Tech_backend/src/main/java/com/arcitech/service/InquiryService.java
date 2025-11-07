package com.arcitech.service;

import com.arcitech.dto.InquiryDTO;
import com.arcitech.model.Inquiry;
import com.arcitech.repository.InquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InquiryService {

    private final InquiryRepository inquiryRepository;

    public Inquiry createInquiry(InquiryDTO dto) {
        Inquiry inquiry = Inquiry.builder()
                .fullName(dto.getFullName())
                .email(dto.getEmail())
                .message(dto.getMessage())
                .status(Inquiry.Status.NEW)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return inquiryRepository.save(inquiry);
    }

    public List<InquiryDTO> getAllInquiries() {
        return inquiryRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public InquiryDTO updateInquiryStatus(Long id, String status) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inquiry not found"));

        inquiry.setStatus(Inquiry.Status.valueOf(status));
        inquiry.setUpdatedAt(LocalDateTime.now());
        Inquiry updated = inquiryRepository.save(inquiry);

        return toDTO(updated);
    }

    public void deleteInquiry(Long id) {
        if (!inquiryRepository.existsById(id))
            throw new RuntimeException("Inquiry not found");
        inquiryRepository.deleteById(id);
    }

    private InquiryDTO toDTO(Inquiry inquiry) {
        InquiryDTO dto = new InquiryDTO();
        dto.setId(inquiry.getId());
        dto.setFullName(inquiry.getFullName());
        dto.setEmail(inquiry.getEmail());
        dto.setMessage(inquiry.getMessage());
        dto.setStatus(inquiry.getStatus().name());
        dto.setCreatedAt(inquiry.getCreatedAt());
        return dto;
    }
}
