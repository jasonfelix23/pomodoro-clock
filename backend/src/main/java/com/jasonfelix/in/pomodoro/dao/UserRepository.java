package com.jasonfelix.in.pomodoro.dao;

import com.jasonfelix.in.pomodoro.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findUserByEmailAddress(String emailAddress);
}
