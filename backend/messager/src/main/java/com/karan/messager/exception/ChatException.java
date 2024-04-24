package com.karan.messager.exception;

import com.karan.messager.repository.ChatRepository;

public class ChatException extends Exception{
    public ChatException(String message){
        super(message);
    }
}
