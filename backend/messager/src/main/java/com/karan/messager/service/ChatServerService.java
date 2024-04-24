package com.karan.messager.service;

import com.karan.messager.exception.ChatServerException;
import com.karan.messager.exception.UserException;
import com.karan.messager.modal.ChatServer;
import com.karan.messager.modal.User;
import com.karan.messager.request.GroupChatRequest;

import java.util.List;


public interface ChatServerService {
     ChatServer createChatServer(User reqUser, Integer userId2) throws UserException;

     public ChatServer findChatById(Integer chatId)throws ChatServerException;

    public List<ChatServer> findAllChatsByUserId(Integer userId)throws UserException;

    public ChatServer createGroup(GroupChatRequest req, User reqUser)throws UserException;

    public ChatServer addUserToGroup(Integer chatId,String groupName, User reqUser)throws ChatServerException,UserException;

    public ChatServer renameGroup(Integer chatId,String groupName)throws ChatServerException,UserException;

    public ChatServer deleteChatServer(Integer chatId, Integer userId)throws ChatServerException,UserException;
}
