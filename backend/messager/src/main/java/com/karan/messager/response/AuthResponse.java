package com.karan.messager.response;

public class AuthResponse {
    private String jwt;
    private Boolean isAuth;

    public AuthResponse(String jwt, Boolean isAuth) {
        super();
        this.jwt = jwt;
        this.isAuth = isAuth;
    }
}
