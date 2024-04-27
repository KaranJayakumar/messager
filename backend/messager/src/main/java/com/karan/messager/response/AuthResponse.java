package com.karan.messager.response;

public class AuthResponse {
    private String jwt;
    private Boolean isAuth;

    public AuthResponse(String jwt, Boolean isAuth) {
        super();
        this.jwt = jwt;
        this.isAuth = isAuth;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public Boolean getAuth() {
        return isAuth;
    }

    public void setAuth(Boolean auth) {
        isAuth = auth;
    }
}
