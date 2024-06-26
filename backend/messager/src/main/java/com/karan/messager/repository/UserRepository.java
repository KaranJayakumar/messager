package com.karan.messager.repository;

import com.karan.messager.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer>{
    @Query("SELECT u FROM user u WHERE u.email = :email")
    User findByEmail(@Param("email")String email);

    @Query("SELECT u FROM user u WHERE u.fullName LIKE %:query% or u.email LIKE %:query%")
    List<User> searchUsers(@Param("query") String query);
}
