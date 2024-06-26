package com.karan.messager.modal;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Table(name = "chat_server")
@Entity(name = "chat_server")
public class ChatServer {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name="chat_name")

    private String chatName;

    @Column(name="chat_image")
    private String chatImage;

    @Column(name="is_group")
    private boolean isGroup;

    @PrimaryKeyJoinColumn(name = "created_by")
    @OneToOne
    private User createdBy;

    @Column(name="admins")
    @ManyToMany
    private Set<User> admins = new HashSet<>();

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<User> users = new HashSet<>();

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getChatName() {
        return chatName;
    }

    public String getChatImage() {
        return chatImage;
    }

    public boolean isGroup() {
        return isGroup;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setAdmins(Set<User> admins) {
        this.admins = admins;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @OneToMany(mappedBy="chatServer")
    @JsonManagedReference
    private List<Message> messages = new ArrayList<>();
    public ChatServer() {
    }

    public Set<User> getAdmins() {
        return admins;
    }

    public Integer getId() {
        return id;
    }


    public void setChatName(String chatName) {
        this.chatName = chatName;
    }

    public void setChatImage(String chatImage) {
        this.chatImage = chatImage;
    }

    public void setGroup(boolean group) {
        this.isGroup = group;
    }
    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public Set<User> getUsers() {
        return users;
    }

    public ChatServer(Integer id, String chatName, String chatImage, String message, boolean isGroup, User createdBy, Set<User> users, List<Message> messages, Set<User> admins) {
        this.id = id;
        this.chatName = chatName;
        this.chatImage = chatImage;
        this.isGroup = isGroup;
        this.createdBy = createdBy;
        this.users = users;
        this.messages = messages;
        this.admins = admins;
    }

}
