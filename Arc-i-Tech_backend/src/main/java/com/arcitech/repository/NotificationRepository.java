package com.arcitech.repository;

import com.arcitech.model.User;
import com.arcitech.model.UserNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<UserNotification, Long> {
    List<UserNotification> findByRecipient(User recipient);
}
