package com.pawfect.backend.controller;

import com.pawfect.backend.dto.Dtos.*;
import com.pawfect.backend.service.GroqService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final GroqService groqService;

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        String reply = groqService.chat(request.getMessages());
        return ResponseEntity.ok(ChatResponse.builder().message(reply).build());
    }
}