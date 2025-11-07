package com.arcitech.repository;

import com.arcitech.model.ClientCompany;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientCompanyRepository extends JpaRepository<ClientCompany, Long> {
}
