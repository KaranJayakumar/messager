package com.karan.messager.controller;

import com.karan.messager.modal.User;
import com.karan.messager.request.UpdateUserRequest;
import com.karan.messager.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private UserService userService;

    public UserController (UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String token){
        User user = userService.findUserProfile(token);
        return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);

    }
    @GetMapping("/{query}")
    public ResponseEntity<List<User>> searchUserHandler(@PathVariable("query") String query){
        List<User> users = userService.searchUser(query);
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @GetMapping("/update")
    public ResponseEntity<ApiResponse> updateUserHandler(@ResponseBody UpdateUserRequest req, @RequestHeader String token){
        User user = userService.findUserProfile(token);
        userService.updateUser(user.getId(), req);
        return new ResponseEntity<ApiResponse>();
    }

}
