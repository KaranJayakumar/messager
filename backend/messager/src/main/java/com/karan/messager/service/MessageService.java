package com.karan.messager.service;

import com.karan.messager.exception.ChatServerException;
import com.karan.messager.exception.MessageException;
import com.karan.messager.exception.UserException;
import com.karan.messager.modal.Message;
import com.karan.messager.modal.User;
import com.karan.messager.request.SendMessageRequest;

import java.util.List;

public interface MessageService {
    public Message sendMessage(SendMessageRequest sendMessageRequest) throws MessageException, UserException, ChatServerException;

    List<Message> getChatMessages(Integer chatId, User reqUser) throws ChatServerException, UserException;

    public Message findMessageById(Integer messageId) throws MessageException;

    void deleteMessage(Integer messageId, User reqUser) throws MessageException, UserException;
}
