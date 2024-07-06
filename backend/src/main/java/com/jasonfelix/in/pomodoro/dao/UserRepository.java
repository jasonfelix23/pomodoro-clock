package com.jasonfelix.in.pomodoro.dao;

import com.jasonfelix.in.pomodoro.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
