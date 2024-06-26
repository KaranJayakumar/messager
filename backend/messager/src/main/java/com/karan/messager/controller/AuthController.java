package com.karan.messager.controller;

import com.karan.messager.config.TokenProvider;
import com.karan.messager.exception.UserException;
import com.karan.messager.modal.User;
import com.karan.messager.repository.UserRepository;
import com.karan.messager.request.LoginRequest;
import com.karan.messager.response.AuthResponse;
import com.karan.messager.service.CustomUserService;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private TokenProvider tokenProvider;
    private CustomUserService customUserService;
    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, TokenProvider tokenProvider, CustomUserService customUserService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.customUserService = customUserService;
    }
    @PostMapping(value ="/signup", consumes = "application/json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
        String email = user.getEmail();
        String full_name = user.getFullName();
        String password = user.getPassword();
        User userInRepo = userRepository.findByEmail(email);
        if(userInRepo != null){
            throw new UserException("Email is already in use " + email);
        }
        User newUser = new User();
        newUser.setFullName(full_name);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setEmail(email);
        userRepository.save(newUser);
        //System.out.println("reached");
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        //System.out.println("reached past auth");
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        //System.out.println("reached past generate");
        ResponseEntity<AuthResponse> res = new ResponseEntity<AuthResponse>(new AuthResponse(jwt, true), HttpStatus.ACCEPTED);
        //System.out.println("reached past response");
        return res;
    }
    @PostMapping(value ="/login", consumes = "application/json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest loginRequest){
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        Authentication authentication = authenticate(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        return new ResponseEntity<AuthResponse>(new AuthResponse(jwt, true), HttpStatus.ACCEPTED);
    }
    public Authentication authenticate(String email, String password){
        UserDetails userDetails = customUserService.loadUserByUsername(email);
        if(userDetails == null){
            throw new BadCredentialsException("Invalid email or password");
        }
        if(!(passwordEncoder.matches(password, userDetails.getPassword()))){
            throw new BadCredentialsException("Invalid email or password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

    }
}
