package com.karan.messager.response;

public class ApiResponse {
    private String message;
    private Boolean status;
    public ApiResponse(String message, boolean status){
        super();
        this.message = message;
        this.status = status;
    }
}
