package com.srgec.PGFinder.service;
import com.srgec.PGFinder.entity.ChatMessage;
import com.srgec.PGFinder.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public ChatMessage saveMessage(ChatMessage message) {

        return chatRepository.save(message);

    }

    public List<ChatMessage> getAllMessages() {

        return chatRepository.findAll();

    }

}
