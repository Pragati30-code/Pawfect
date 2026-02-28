package com.pawfect.backend.controller;

import com.pawfect.backend.dto.Dtos.*;
import com.pawfect.backend.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ChatController {

    private final ConversationService conversationService;

    // Send a message (creates conversation if conversationId is null)
    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(
            @RequestBody ChatRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                conversationService.sendMessage(request, userDetails.getUsername()));
    }

    // List all conversations for the current user
    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationSummary>> getConversations(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                conversationService.getConversations(userDetails.getUsername()));
    }

    // Load a specific conversation with all messages
    @GetMapping("/conversations/{id}")
    public ResponseEntity<ConversationDetail> getConversation(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                conversationService.getConversation(id, userDetails.getUsername()));
    }

    // Delete a conversation
    @DeleteMapping("/conversations/{id}")
    public ResponseEntity<Void> deleteConversation(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {
        conversationService.deleteConversation(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}