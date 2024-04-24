package com.karan.messager.modal;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

public class Chat {

    private Integer id;
    private String chat_name;
    private String chat_image;

    String message;

    @Column(name="is_group")
    private boolean is_group;

    @Column(name="created_by")
    @ManyToOne
    private User createdBy;

    @ManyToMany
    private Set<User> users = new HashSet<>();

    @OneToMany
    private List<Message> messages = new ArrayList<>();
}
