package com.arcitech.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "chat_messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    private User sender;

    @Column(columnDefinition = "TEXT")
    private String message;

    @ElementCollection
    @CollectionTable(name = "chat_message_attachments", 
                    joinColumns = @JoinColumn(name = "message_id"))
    @Column(name = "attachment_url")
    private List<String> attachments;

    @ElementCollection
    @CollectionTable(name = "chat_message_reactions", 
                    joinColumns = @JoinColumn(name = "message_id"))
    private Set<MessageReaction> reactions = new HashSet<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Embeddable
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MessageReaction {
        private String emoji;
        
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "user_id")
        private User user;
    }

    public void addReaction(String emoji, User user) {
        reactions.add(new MessageReaction(emoji, user));
    }

    public void removeReaction(String emoji, User user) {
        reactions.removeIf(reaction -> 
            reaction.getEmoji().equals(emoji) && 
            reaction.getUser().getId().equals(user.getId())
        );
    }
}