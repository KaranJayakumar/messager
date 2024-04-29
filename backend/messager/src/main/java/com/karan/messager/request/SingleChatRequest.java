package com.karan.messager.request;

public class SingleChatRequest {
    private Integer userId;
    public SingleChatRequest(Integer userId){
        super();
        this.userId = userId;
    }
    public SingleChatRequest(){
        super();
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getUserId() {
        return userId;
    }
}
