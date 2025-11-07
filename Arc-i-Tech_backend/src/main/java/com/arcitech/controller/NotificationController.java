package com.arcitech.controller;

import com.arcitech.dto.NotificationDTO;
import com.arcitech.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // Get notifications for logged-in user
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<NotificationDTO>> getUserNotifications(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(notificationService.getNotificationsForUser(userDetails.getUsername()));
    }

    // Mark notification as read
    @PutMapping("/{id}/read")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok("Notification marked as read");
    }

    // Admin: send a custom notification to user
    @PostMapping("/send/{userId}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN','SUB_ADMIN')")
    public ResponseEntity<String> sendCustomNotification(
            @PathVariable Long userId,
            @RequestBody NotificationDTO dto
    ) {
        notificationService.sendNotification(userId, dto);
        return ResponseEntity.ok("Notification sent successfully");
    }
}
