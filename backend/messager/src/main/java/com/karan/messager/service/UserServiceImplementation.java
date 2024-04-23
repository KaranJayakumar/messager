package com.karan.messager.service;

import com.karan.messager.config.TokenProvider;
import com.karan.messager.exception.UserException;
import com.karan.messager.modal.User;
import com.karan.messager.repository.UserRepository;
import com.karan.messager.request.UpdateUserRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService {
    private UserRepository userRepo;
    private TokenProvider tokenProvider;

    public UserServiceImplementation(UserRepository userRepo, TokenProvider tokenProvider) {
        this.userRepo = userRepo;
        this.tokenProvider = tokenProvider;
    }

    @Override
    public User findUserProfile(String jwt) throws UserException {
        String email = tokenProvider.getEmailFromToken(jwt);
        if(email == null){
            throw new BadCredentialsException("Received invalid token");
        }
        User user = userRepo.findByEmail(email);
        if(user == null) {
            throw new UserException("User not found with Provided email " + email);
        }
        return user;
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
        User user = findUserById(userId);
        if(req.getFull_name() != null){
            user.setFull_name(req.getFull_name());
        }
        if(req.getProfile_picture() != null){
            user.setProfile_picture(req.getProfile_picture());
        }
        return userRepo.save(user);
    }

    @Override
    public List<User> searchUser(String query) {
        return userRepo.searchUsers(query);
    }
}
