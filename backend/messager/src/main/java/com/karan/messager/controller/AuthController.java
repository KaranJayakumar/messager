package com.karan.messager.controller;

import com.karan.messager.config.TokenProvider;
import com.karan.messager.exception.UserException;
import com.karan.messager.modal.User;
import com.karan.messager.repository.UserRepository;
import com.karan.messager.response.AuthResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private TokenProvider tokenProvider;
    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenProvider tokenProvider){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
        String email = user.getEmail();
        String full_name = user.getFull_name();
        String password = user.getPassword();
        User userInRepo = userRepository.findByEmail(email);
        if(userInRepo == null){
            throw new UserException("Email is already in use " + email);
        }
        User newUser = new User();
        newUser.setFull_name(full_name);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setEmail(email);
        userRepository.save(newUser);
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        return new ResponseEntity<AuthResponse>(new AuthResponse(jwt, true), HttpStatus.ACCEPTED);
    }
}
