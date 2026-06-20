package com.srgec.PGFinder.repository;
import com.srgec.PGFinder.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository
        extends JpaRepository<ChatMessage, Long> {

}