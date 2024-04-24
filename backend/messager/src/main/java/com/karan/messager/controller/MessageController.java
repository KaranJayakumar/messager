package com.karan.messager.controller;

import com.karan.messager.exception.ChatServerException;
import com.karan.messager.exception.MessageException;
import com.karan.messager.exception.UserException;
import com.karan.messager.modal.User;
import com.karan.messager.request.SendMessageRequest;
import com.karan.messager.modal.Message;
import com.karan.messager.response.ApiResponse;
import com.karan.messager.service.MessageService;
import com.karan.messager.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private MessageService messageService;
    private UserService userService;

    public MessageController(MessageService messageService, UserService userService) {
        this.messageService = messageService;
        this.userService = userService;
    }
    @PostMapping("/create")
    public ResponseEntity<Message> sendMessageHandler(@RequestBody SendMessageRequest req, @RequestHeader("Authorization") String jwt) throws MessageException, ChatServerException, UserException {
        User user = userService.findUserProfile(jwt);
        req.setUserId(user.getId());
        Message message = messageService.sendMessage(req);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
    @GetMapping("/create/{chatId}")
    public ResponseEntity<List<Message>> getChatServerMessagesHandler(@PathVariable Integer chatId, @RequestHeader("Authorization") String jwt) throws ChatServerException, UserException {
        User user = userService.findUserProfile(jwt);
        List<Message> messages = messageService.getChatMessages(chatId, user);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
    @DeleteMapping("/{messageId}")
    public ResponseEntity<ApiResponse> deleteMessageWithIdHandler(@PathVariable Integer messageId, @RequestHeader("Authorization") String jwt) throws ChatServerException, UserException, MessageException {
        User user = userService.findUserProfile(jwt);
        messageService.deleteMessage(messageId, user);
        ApiResponse res = new ApiResponse("Message deleted successfully", true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
