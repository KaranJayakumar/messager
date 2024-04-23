package com.karan.messager.service;

import com.karan.messager.exception.UserException;
import com.karan.messager.modal.User;
import com.karan.messager.repository.UserRepository;
import com.karan.messager.request.UpdateUserRequest;

import java.util.List;
import java.util.Optional;

public class UserServiceImplementation implements UserService {
    private UserRepository userRepo;

    @Override
    public User findUserProfile(String jwt) {
        return null;
    }

    @Override
    public User findUserById(Integer id) throws UserException {
        Optional<User> user = userRepo.findById(id);
        if(user.isPresent()){
            return user.get();
        }
        throw new UserException("User not Found");
    }

    @Override
    public User updateUser(Integer userId, UpdateUserRequest req) throws UserException {
        return null;
    }

    @Override
    public List<User> searchUser(String query) {
        return List.of();
    }
}
