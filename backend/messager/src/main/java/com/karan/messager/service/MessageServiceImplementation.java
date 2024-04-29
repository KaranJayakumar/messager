package com.karan.messager.service;

import com.karan.messager.exception.ChatServerException;
import com.karan.messager.exception.MessageException;
import com.karan.messager.exception.UserException;
import com.karan.messager.modal.ChatServer;
import com.karan.messager.modal.Message;
import com.karan.messager.modal.User;
import com.karan.messager.repository.MessageRepository;
import com.karan.messager.request.SendMessageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Service
public class MessageServiceImplementation implements MessageService{
    private MessageRepository messageRepository;
    private UserService userService;
    private ChatServerService chatServerService;

    public MessageServiceImplementation(UserService userService, MessageRepository messageRepository, ChatServerService chatServerService) {
        this.userService = userService;
        this.messageRepository = messageRepository;
        this.chatServerService = chatServerService;
    }
    @Override
    public Message sendMessage(SendMessageRequest sendMessageRequest) throws MessageException, UserException, ChatServerException {
        User user = userService.findUserById(sendMessageRequest.getUserId());
        ChatServer chatServer = chatServerService.findChatById(sendMessageRequest.getChatId());
        Message message = new Message();
        message.setChatServer(chatServer);
        message.setUser(user);
        message.setContent(sendMessageRequest.getContent());
        message.setTimestamp(LocalDateTime.now());
        messageRepository.save(message);
        return message;
    }

    @Override
    public List<Message> getChatMessages(Integer chatId, User reqUser) throws ChatServerException, UserException {
        ChatServer chatServer = chatServerService.findChatById(chatId);
        if(!chatServer.getUsers().contains(reqUser)){
            throw new UserException("Cannot get Messages of Chat Server you are not authorized in");
        }
        return messageRepository.findMessagesWithChatId(chatServer.getId());
    }

    @Override
    public Message findMessageById(Integer messageId) throws MessageException {
        Optional<Message> opt = messageRepository.findById(messageId);
        if(opt.isPresent()){
            return opt.get();
        }else{
            throw new MessageException("No messages with this Id " + messageId);
        }
    }

    @Override
    public void deleteMessage(Integer messageId, User reqUser) throws MessageException, UserException {
        Message message = findMessageById(messageId);
        if(message.getUser().getId().equals(reqUser.getId())){
            messageRepository.deleteById(messageId);
        }
        throw new UserException("Unauthorized deletion of " + message.getUser() + "'s message");
    }
}
