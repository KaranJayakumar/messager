package com.karan.messager.service;

import com.karan.messager.config.TokenProvider;
import com.karan.messager.exception.UserException;
import com.karan.messager.modal.User;
import com.karan.messager.repository.UserRepository;
import com.karan.messager.request.UpdateUserRequest;
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
            System.out.println("Reached");
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
            user.setFullName(req.getFull_name());
        }
        if(req.getProfile_picture() != null){
            user.setProfilePicture(req.getProfile_picture());
        }
        return userRepo.save(user);
    }

    @Override
    public List<User> searchUser(String query) {
        System.out.println("Search query " + query);
        List<User> users =  userRepo.searchUsers(query);
        System.out.println(users);
        return users;
    }
}
