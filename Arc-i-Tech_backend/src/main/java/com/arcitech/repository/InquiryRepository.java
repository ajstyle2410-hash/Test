package com.arcitech.repository;

import com.arcitech.model.Inquiry;
import com.arcitech.model.Inquiry.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    List<Inquiry> findByStatus(Status status);
    List<Inquiry> findByEmail(String email);
}
