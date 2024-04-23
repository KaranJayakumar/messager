package com.karan.messager.service;

import com.karan.messager.exception.UserException;
import com.karan.messager.modal.User;
import com.karan.messager.request.UpdateUserRequest;

import java.util.List;

public interface UserService {
    public User findUserProfile(String jwt) throws UserException;

    public User findUserById(Integer id) throws UserException;

    public User updateUser(Integer userId, UpdateUserRequest req) throws UserException;

    public List<User> searchUser(String query);
}
