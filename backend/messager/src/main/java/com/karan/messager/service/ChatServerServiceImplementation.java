package com.karan.messager.service;

import com.karan.messager.exception.ChatServerException;
import com.karan.messager.exception.UserException;
import com.karan.messager.modal.ChatServer;
import com.karan.messager.modal.User;
import com.karan.messager.repository.ChatServerRepository;
import com.karan.messager.request.GroupChatRequest;

import java.util.*;

public class ChatServerServiceImplementation implements ChatServerService {

    private ChatServerRepository chatServerRepository;
    private UserService userService;
    public ChatServerServiceImplementation(ChatServerRepository chatServerRepository, UserService userService){
        this.chatServerRepository = chatServerRepository;
        this.userService = userService;
    }
    @Override
    public ChatServer createChatServer(User reqUser, Integer userId2) throws UserException {
        User user = userService.findUserById(userId2);
        ChatServer chatServer = chatServerRepository.findChatServerWithUserIds(user, reqUser);
        if(chatServer != null){
            return chatServer;
        }
        ChatServer newChatServer = new ChatServer();
        newChatServer.setCreatedBy(reqUser);
        newChatServer.getUsers().add(user);
        newChatServer.getUsers().add(reqUser);
        newChatServer.setIs_group(false);
        return newChatServer;
    }

    @Override
    public ChatServer findChatById(Integer chatId) throws ChatServerException {
        Optional<ChatServer> chatServer = chatServerRepository.findById(chatId);
        if(chatServer.isPresent()){
            return chatServer.get();
        }
        throw new ChatServerException("Chat server with Id: " + chatId + "not found" );
    }

    @Override
    public List<ChatServer> findAllChatsByUserId(Integer userId) throws UserException {
        User user = userService.findUserById(userId);
        return chatServerRepository.findChatServersHavingUserId(user.getId());

    }

    @Override
    public ChatServer createGroup(GroupChatRequest req, User reqUser) throws UserException {
        ChatServer group = new ChatServer();
        group.setIs_group(true);
        group.setChat_image(req.getChat_image());
        group.setChat_name(req.getChat_name());
        group.setCreatedBy(reqUser);
        for(Integer userId : req.getUserIds()){
            User user = userService.findUserById(userId);
            if(user!= null){
                group.getUsers().add(user);
            }
        }
        return group;
    }

    @Override
    public ChatServer addUserToGroup(Integer userId, Integer chatId, User reqUser) throws ChatServerException, UserException {
        Optional<ChatServer> opt = chatServerRepository.findById(chatId);
        User user = userService.findUserById(userId);
        if(opt.isPresent()){
            ChatServer chatServer = opt.get();
            if(chatServer.getAdmins().contains(reqUser)){
                chatServer.getUsers().add(user);
                chatServerRepository.save(chatServer);
                return chatServer;
            }else{
                throw new UserException("Non-Admin users cannot add users");
            }
        }
        throw new ChatServerException("Could not find Chat Server with Id" + chatId);
    }

    @Override
    public ChatServer renameGroup(Integer chatId, String groupName, User reqUser) throws ChatServerException, UserException {
        Optional<ChatServer> opt = chatServerRepository.findById(chatId);
        if(opt.isPresent()){
            ChatServer chatServer = opt.get();
            if(chatServer.getAdmins().contains(reqUser)){
                chatServer.setChat_name(groupName);
                chatServerRepository.save(chatServer);
                return chatServer;
            }else{
                throw new UserException("Non-Admin users cannot rename chat servers");
            }
        }
        throw new ChatServerException("Could not find Chat Server with Id" + chatId);
    }

    @Override
    public ChatServer removeUserFromGroup(Integer chatId, Integer userId, User reqUser) throws ChatServerException, UserException {
        Optional<ChatServer> opt = chatServerRepository.findById(chatId);
        User user = userService.findUserById(userId);
        if(opt.isPresent()){
            ChatServer chatServer = opt.get();
            if(chatServer.getAdmins().contains(reqUser)){
                chatServer.getUsers().remove(user);
                chatServerRepository.save(chatServer);
                return chatServer;
            }else if(chatServer.getUsers().contains(reqUser)){
                if(user.getId().equals(reqUser.getId())){
                    chatServer.getUsers().remove(user);
                    chatServerRepository.save(chatServer);
                    return chatServer;
                }else{
                    throw new UserException("Non-Admin users cannot remove users");
                }
            }else{
                throw new UserException("Non-Admin users cannot remove users");
            }
        }
        throw new ChatServerException("Could not find Chat Server with Id" + chatId);
    }

    @Override
    public void deleteChatServer(Integer chatId, Integer userId) throws ChatServerException, UserException {
        Optional<ChatServer> opt = chatServerRepository.findById(chatId);
        User user = userService.findUserById(userId);
        if(opt.isPresent()){
            ChatServer chatServer = opt.get();
            chatServerRepository.deleteById(chatServer.getId());
        }
    }
}
