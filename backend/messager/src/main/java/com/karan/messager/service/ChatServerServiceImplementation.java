package com.karan.messager.service;

import com.karan.messager.exception.ChatException;
import com.karan.messager.exception.UserException;
import com.karan.messager.modal.ChatServer;
import com.karan.messager.modal.User;
import com.karan.messager.repository.ChatRepository;
import com.karan.messager.request.GroupChatRequest;

import java.util.List;

public class ChatServerServiceImplementation implements ChatServerService {

    private ChatRepository chatRepository;
    private UserService userService;
    public ChatServerServiceImplementation(ChatRepository chatRepository, UserService userService){
        this.chatRepository = chatRepository;
        this.userService = userService;
    }
    @Override
    public ChatServer createChatServer(User reqUser, Integer userId2) throws UserException {
        User user = userService.findUserById(userId2);
        return null;
    }

    @Override
    public ChatServer findChatById(Integer chatId) throws ChatException {
        return null;
    }

    @Override
    public List<ChatServer> findAllChatsByUserId(Integer chatId) throws UserException {
        return List.of();
    }

    @Override
    public List<ChatServer> createGroup(GroupChatRequest req, Integer reqUserId) throws UserException {
        return List.of();
    }

    @Override
    public ChatServer addUserToGroup(Integer chatId, String groupName, Integer reqUserId) throws ChatException, UserException {
        return null;
    }

    @Override
    public ChatServer renameGroup(Integer chatId, String groupName) throws ChatException, UserException {
        return null;
    }

    @Override
    public ChatServer deleteChatServer(Integer chatId, Integer userId) throws ChatException, UserException {
        return null;
    }
}
