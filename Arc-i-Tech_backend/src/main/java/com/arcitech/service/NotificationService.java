package com.arcitech.service;

import com.arcitech.dto.NotificationDTO;
import com.arcitech.model.User;
import com.arcitech.model.UserNotification;
import com.arcitech.repository.UserNotificationRepository;
import com.arcitech.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final UserNotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public List<NotificationDTO> getNotificationsForUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return notificationRepository.findByRecipient(user)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public void markAsRead(Long id) {
        UserNotification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setReadFlag(true);
        notificationRepository.save(notification);
    }

    public void sendNotification(Long userId, NotificationDTO dto) {
        User recipient = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Recipient not found"));

        UserNotification notification = UserNotification.builder()
                .title(dto.getTitle())
                .message(dto.getMessage())
                .readFlag(false)
                .type(UserNotification.Type.valueOf(dto.getType()))
                .createdAt(LocalDateTime.now())
                .recipient(recipient)
                .build();

        notificationRepository.save(notification);
    }

    private NotificationDTO toDTO(UserNotification entity) {
        NotificationDTO dto = new NotificationDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setMessage(entity.getMessage());
        dto.setRead(entity.isReadFlag());
        dto.setType(entity.getType().name());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}
