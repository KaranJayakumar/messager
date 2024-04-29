package com.karan.messager.request;

import java.util.List;

public class GroupChatRequest {
    private List<Integer> userIds;
    private String chatName;
    private String chatImage;

    public GroupChatRequest(List<Integer> userIds, String chatName, String chatImage) {
        this.userIds = userIds;
        this.chatName = chatName;
        this.chatImage = chatImage;
    }

    public String getChatName() {
        return chatName;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }

    public String getChat_image() {
        return chatImage;
    }

    public void setChat_image(String chat_image) {
        this.chatImage = chat_image;
    }

    public List<Integer> getUserIds() {
        return userIds;
    }

    public void setUserIds(List<Integer> userIds) {
        this.userIds = userIds;
    }

}
