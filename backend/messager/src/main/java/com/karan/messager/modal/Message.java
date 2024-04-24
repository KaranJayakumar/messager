package com.karan.messager.modal;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

import java.time.LocalDateTime;

public class Message {
    @Id
    @GeneratedValue
    private Integer id;

    private LocalDateTime timestamp;

    @ManyToOne
    private User user;

    @ManyToOne
    private ChatServer chatServer;

}
