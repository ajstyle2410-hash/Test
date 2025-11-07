package com.arcitech.controller;

import com.arcitech.model.ChatMessage;
import com.arcitech.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @GetMapping("/{projectId}/messages")
    public ResponseEntity<List<ChatMessage>> getMessages(
        @PathVariable Long projectId,
        @RequestParam(required = false) String before,
        @RequestParam(defaultValue = "20") int limit
    ) {
        return ResponseEntity.ok(chatService.getMessages(projectId, before, limit));
    }

    @PostMapping("/{projectId}/messages")
    public ResponseEntity<ChatMessage> sendMessage(
        @PathVariable Long projectId,
        @RequestParam(required = false) List<MultipartFile> attachments,
        @RequestBody Map<String, String> payload,
        Authentication auth
    ) {
        return ResponseEntity.ok(chatService.sendMessage(
            projectId,
            payload.get("message"),
            attachments,
            auth.getName()
        ));
    }

    @PostMapping("/messages/{messageId}/reactions")
    public ResponseEntity<Void> addReaction(
        @PathVariable Long messageId,
        @RequestBody Map<String, String> payload,
        Authentication auth
    ) {
        chatService.addReaction(messageId, payload.get("emoji"), auth.getName());
        return ResponseEntity.ok().build();
    }
}