package com.karan.messager.service;

import com.karan.messager.exception.ChatServerException;
import com.karan.messager.exception.MessageException;
import com.karan.messager.modal.Message;
import com.karan.messager.request.SendMessageRequest;

import java.util.List;

public interface MessageService {
    public Message sendMessage(SendMessageRequest sendMessageRequest) throws MessageException;
    public List<Message> getChatMessages(Integer chatId) throws ChatServerException;
    public Message findMessageById(Integer messageId) throws MessageException;
    public void deleteMessage(Integer messageId) throws MessageException;
}
