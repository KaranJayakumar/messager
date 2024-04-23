package com.karan.messager.request;

public class UpdateUserRequest {
    private String full_name;
    private String profile_picture;
    public UpdateUserRequest(){
    }

    public UpdateUserRequest(String full_name, String profile_picture) {
        this.full_name = full_name;
        this.profile_picture = profile_picture;
    }
}
