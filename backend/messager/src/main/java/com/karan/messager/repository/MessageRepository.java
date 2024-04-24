package com.karan.messager.repository;

import com.karan.messager.modal.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {
    @Query("SELECT m from message m JOIN m.chatServer cs WHERE cs.id = :chatId")
    public List<Message> findMessagesWithChatId(@Param("chatId") Integer chatId);
}
