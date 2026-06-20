package com.srgec.PGFinder.controller;
import com.srgec.PGFinder.entity.ChatMessage;
import com.srgec.PGFinder.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private ChatRepository chatRepository;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(
            ChatMessage chatMessage) {

        chatRepository.save(chatMessage);

        return chatMessage;
    }

}