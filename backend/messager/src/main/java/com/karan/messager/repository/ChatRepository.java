package com.karan.messager.repository;

import com.karan.messager.modal.ChatServer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<ChatServer, Integer> {
}
