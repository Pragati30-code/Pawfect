package com.pawfect.backend.repository;

import com.pawfect.backend.entity.ChatMessageEntity;
import com.pawfect.backend.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessageEntity, String> {

    List<ChatMessageEntity> findByConversationOrderByCreatedAtAsc(Conversation conversation);
}