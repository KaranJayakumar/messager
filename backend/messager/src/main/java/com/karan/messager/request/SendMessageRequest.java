package com.karan.messager.request;

import com.karan.messager.modal.User;

public class SendMessageRequest {
    private String content;
    private Integer chatId;
    private Integer userId;

    public SendMessageRequest(String content, Integer chatId, Integer userId) {
        this.content = content;
        this.chatId = chatId;
        this.userId = userId;
    }

    public Integer getUserId() {
        return userId;
    }

    public Integer getChatId() {
        return chatId;
    }

    public String getContent() {
        return content;
    }
}
