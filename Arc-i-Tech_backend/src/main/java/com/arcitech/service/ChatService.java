package com.arcitech.service;

import com.arcitech.model.ChatMessage;
import com.arcitech.model.Project;
import com.arcitech.model.User;
import com.arcitech.repository.ChatMessageRepository;
import com.arcitech.repository.ProjectRepository;
import com.arcitech.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatMessageRepository chatMessageRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final FileStorageService fileStorageService;

    @Transactional(readOnly = true)
    public List<ChatMessage> getMessages(Long projectId, String before, int limit) {
        Long beforeId = before != null && !before.isEmpty() ? Long.parseLong(before) : null;
        return chatMessageRepository.findByProjectIdOrderByCreatedAtDesc(
            projectId,
            beforeId,
            PageRequest.of(0, limit)
        );
    }

    @Transactional
    public ChatMessage sendMessage(Long projectId, String message, List<MultipartFile> attachments, String senderEmail) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new RuntimeException("Project not found"));
            
        User sender = userRepository.findByEmail(senderEmail)
            .orElseThrow(() -> new RuntimeException("User not found"));

        List<String> attachmentUrls = null;
        if (attachments != null && !attachments.isEmpty()) {
            attachmentUrls = attachments.stream()
                .map(fileStorageService::store)
                .toList();
        }

        ChatMessage chatMessage = ChatMessage.builder()
            .project(project)
            .sender(sender)
            .message(message)
            .attachments(attachmentUrls)
            .build();

        return chatMessageRepository.save(chatMessage);
    }

    @Transactional
    public void addReaction(Long messageId, String emoji, String userEmail) {
        ChatMessage message = chatMessageRepository.findById(messageId)
            .orElseThrow(() -> new RuntimeException("Message not found"));
            
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("User not found"));

        message.addReaction(emoji, user);
        chatMessageRepository.save(message);
    }
}