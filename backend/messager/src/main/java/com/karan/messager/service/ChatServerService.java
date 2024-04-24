package com.karan.messager.service;

import com.karan.messager.exception.ChatException;
import com.karan.messager.exception.UserException;
import com.karan.messager.modal.ChatServer;
import com.karan.messager.modal.User;
import com.karan.messager.request.GroupChatRequest;

import java.util.List;


public interface ChatServerService {
     ChatServer createChatServer(User reqUser, Integer userId2) throws UserException;

     public ChatServer findChatById(Integer chatId)throws ChatException;

    public List<ChatServer> findAllChatsByUserId(Integer chatId)throws UserException;

    public List<ChatServer> createGroup(GroupChatRequest req, Integer reqUserId)throws UserException;

    public ChatServer addUserToGroup(Integer chatId,String groupName, Integer reqUserId)throws ChatException,UserException;

    public ChatServer renameGroup(Integer chatId,String groupName)throws ChatException,UserException;

    public ChatServer deleteChatServer(Integer chatId, Integer userId)throws ChatException,UserException;
}
