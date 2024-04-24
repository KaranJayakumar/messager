package com.karan.messager.modal;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class ChatServer {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String chat_name;
    private String chat_image;

    @Column(name="is_group")
    private boolean is_group;

    @PrimaryKeyJoinColumn(name = "created_by")
    @OneToOne
    private User createdBy;

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy="chatServer")
    private List<Message> messages = new ArrayList<>();
    public ChatServer() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getChat_name() {
        return chat_name;
    }

    public void setChat_name(String chat_name) {
        this.chat_name = chat_name;
    }

    public String getChat_image() {
        return chat_image;
    }

    public void setChat_image(String chat_image) {
        this.chat_image = chat_image;
    }

    public boolean isIs_group() {
        return is_group;
    }

    public void setIs_group(boolean is_group) {
        this.is_group = is_group;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public ChatServer(Integer id, String chat_name, String chat_image, String message, boolean is_group, User createdBy, Set<User> users, List<Message> messages) {
        this.id = id;
        this.chat_name = chat_name;
        this.chat_image = chat_image;
        this.is_group = is_group;
        this.createdBy = createdBy;
        this.users = users;
        this.messages = messages;
    }

}
