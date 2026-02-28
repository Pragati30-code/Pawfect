package com.pawfect.backend.service;

import com.pawfect.backend.dto.Dtos.*;
import com.pawfect.backend.entity.ChatMessageEntity;
import com.pawfect.backend.entity.Conversation;
import com.pawfect.backend.entity.User;
import com.pawfect.backend.repository.ChatMessageRepository;
import com.pawfect.backend.repository.ConversationRepository;
import com.pawfect.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    private final GroqService groqService;

    // ── Get user's conversations ──────────────────────

    public List<ConversationSummary> getConversations(String email) {
        User user = getUser(email);
        return conversationRepository.findByUserOrderByUpdatedAtDesc(user)
                .stream()
                .map(c -> ConversationSummary.builder()
                        .id(c.getId())
                        .title(c.getTitle())
                        .createdAt(c.getCreatedAt())
                        .updatedAt(c.getUpdatedAt())
                        .build())
                .collect(Collectors.toList());
    }

    // ── Load a full conversation ──────────────────────

    public ConversationDetail getConversation(String id, String email) {
        User user = getUser(email);
        Conversation conversation = conversationRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        List<ChatMessage> messages = chatMessageRepository
                .findByConversationOrderByCreatedAtAsc(conversation)
                .stream()
                .map(m -> new ChatMessage(m.getRole(), m.getContent()))
                .collect(Collectors.toList());

        return ConversationDetail.builder()
                .id(conversation.getId())
                .title(conversation.getTitle())
                .messages(messages)
                .createdAt(conversation.getCreatedAt())
                .updatedAt(conversation.getUpdatedAt())
                .build();
    }

    // ── Send a message ────────────────────────────────

    @Transactional
    public ChatResponse sendMessage(ChatRequest request, String email) {
        User user = getUser(email);

        // Find or create conversation
        Conversation conversation;
        if (request.getConversationId() != null) {
            conversation = conversationRepository.findByIdAndUser(request.getConversationId(), user)
                    .orElseThrow(() -> new RuntimeException("Conversation not found"));
        } else {
            // New conversation — title from first user message, truncated to 60 chars
            String firstMessage = request.getMessages().get(0).getContent();
            String title = firstMessage.length() > 60
                    ? firstMessage.substring(0, 60) + "..."
                    : firstMessage;

            conversation = Conversation.builder()
                    .user(user)
                    .title(title)
                    .build();
            conversation = conversationRepository.save(conversation);
        }

        // Save the latest user message
        ChatMessage lastUserMsg = request.getMessages().get(request.getMessages().size() - 1);
        ChatMessageEntity userMsgEntity = ChatMessageEntity.builder()
                .conversation(conversation)
                .role("user")
                .content(lastUserMsg.getContent())
                .build();
        chatMessageRepository.save(userMsgEntity);

        // Call Groq with full history
        String aiReply = groqService.chat(request.getMessages());

        // Save assistant reply
        ChatMessageEntity assistantMsgEntity = ChatMessageEntity.builder()
                .conversation(conversation)
                .role("assistant")
                .content(aiReply)
                .build();
        chatMessageRepository.save(assistantMsgEntity);

        // Touch updatedAt
        conversationRepository.save(conversation);

        return ChatResponse.builder()
                .conversationId(conversation.getId())
                .message(aiReply)
                .build();
    }

    // ── Delete a conversation ─────────────────────────

    @Transactional
    public void deleteConversation(String id, String email) {
        User user = getUser(email);
        Conversation conversation = conversationRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
        conversationRepository.delete(conversation);
    }

    // ── Helper ────────────────────────────────────────

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
