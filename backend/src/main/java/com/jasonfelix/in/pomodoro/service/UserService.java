package com.jasonfelix.in.pomodoro.service;

import com.jasonfelix.in.pomodoro.Entity.User;

import java.util.List;

public interface UserService {

    List<User> findAll();
    User findById(int id);
    User save(User user);
    void DeleteById(int id);
    int findUserByEmailAddress(String emailAddress);
    boolean updateUser(User user);
}
