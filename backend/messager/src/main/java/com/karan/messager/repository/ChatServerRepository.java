package com.karan.messager.repository;

import com.karan.messager.modal.ChatServer;
import com.karan.messager.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatServerRepository extends JpaRepository<ChatServer, Integer> {
    @Query("SELECT cs FROM chat_server cs JOIN cs.users u WHERE u.id = :userId")
    public List<ChatServer> findChatServersHavingUserId(@Param("userId") Integer userId);

    @Query("SELECT cs FROM chat_server cs WHERE cs.isGroup=false and :user MEMBER OF cs.users AND :reqUser MEMBER OF cs.users")
    public ChatServer findChatServerWithUserIds(@Param("user") User user, @Param("reqUser") User reqUser);
}
