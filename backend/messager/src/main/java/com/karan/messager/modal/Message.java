package com.karan.messager.modal;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Message {
    @Id
    @GeneratedValue
    private Integer id;

    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;

    @ManyToOne
    @JoinColumn(name="chatServer_id", nullable=false)
    private ChatServer chatServer;

}
