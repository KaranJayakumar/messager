package com.karan.messager.controller;

import com.karan.messager.exception.ChatServerException;
import com.karan.messager.exception.UserException;
import com.karan.messager.modal.ChatServer;
import com.karan.messager.modal.User;
import com.karan.messager.request.GroupChatRequest;
import com.karan.messager.request.SingleChatRequest;
import com.karan.messager.response.ApiResponse;
import com.karan.messager.service.ChatServerService;
import com.karan.messager.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/chats")
public class ChatServerController {
    private ChatServerService chatServerService;
    private UserService userService;

    public ChatServerController(UserService userService, ChatServerService chatServerService) {
        this.userService = userService;
        this.chatServerService = chatServerService;
    }
    @PostMapping(value = "/createChat", consumes = "application/json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ChatServer> createChatServerHandler(@RequestBody SingleChatRequest singleChatRequest, @RequestHeader("Authorization") String jwt) throws UserException {
        User reqUser = userService.findUserProfile(jwt);
        if(Objects.equals(singleChatRequest.getUserId(), reqUser.getId())){
            throw new UserException("Cannot create chat with yourself");
        }
        ChatServer chatServer = chatServerService.createChatServer(reqUser, singleChatRequest.getUserId());
        return new ResponseEntity<>(chatServer, HttpStatus.OK);
    }
    @PostMapping("/createGroup")
    public ResponseEntity<ChatServer> createGroupServerHandler(@RequestBody GroupChatRequest groupChatRequest, @RequestHeader("Authorization") String jwt) throws UserException {
        User reqUser = userService.findUserProfile(jwt);
        ChatServer chatServer = chatServerService.createGroup(groupChatRequest, reqUser);
        return new ResponseEntity<>(chatServer, HttpStatus.OK);
    }
    @GetMapping("/{chatId}")
    public ResponseEntity<ChatServer> findChatServerByIdHandler(@PathVariable Integer chatId, @RequestHeader("Authorization") String jwt) throws UserException, ChatServerException {
        User reqUser = userService.findUserProfile(jwt);
        ChatServer chatServer = chatServerService.findChatById(chatId);
        return new ResponseEntity<>(chatServer, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<ChatServer>> findAllChatServersByUserIdHandler(@RequestHeader("Authorization") String jwt) throws UserException, ChatServerException {
        User reqUser = userService.findUserProfile(jwt);
        List<ChatServer> chatServers = chatServerService.findAllChatsByUserId(reqUser.getId());
        return new ResponseEntity<>(chatServers, HttpStatus.OK);
    }
    @PutMapping("/{chatId}/add/{userId}")
    public ResponseEntity<ChatServer> AddUserToGroupChatServerHandler(@PathVariable Integer chatId, @PathVariable Integer userId,  @RequestHeader("Authorization") String jwt) throws UserException, ChatServerException {
        User reqUser = userService.findUserProfile(jwt);
        ChatServer chatServer = chatServerService.addUserToGroup(userId, chatId, reqUser);
        return new ResponseEntity<>(chatServer, HttpStatus.OK);
    }
    @PutMapping("/{chatId}/remove/{userId}")
    public ResponseEntity<ChatServer> removeUserFromGroupChatServerHandler(@PathVariable Integer chatId, @PathVariable Integer userId,  @RequestHeader("Authorization") String jwt) throws UserException, ChatServerException {
        User reqUser = userService.findUserProfile(jwt);
        ChatServer chatServer = chatServerService.removeUserFromGroup(userId, chatId, reqUser);
        return new ResponseEntity<>(chatServer, HttpStatus.OK);
    }
    @PutMapping("/delete/{chatId}")
    public ResponseEntity<ApiResponse> removeUserFromGroupChatServerHandler(@PathVariable Integer chatId, @RequestHeader("Authorization") String jwt) throws UserException, ChatServerException {
        User reqUser = userService.findUserProfile(jwt);
        chatServerService.deleteChatServer(chatId, reqUser.getId());
        ApiResponse res = new ApiResponse("Chat has been deleted successfully", true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

}
