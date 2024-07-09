package com.jasonfelix.in.pomodoro.service;

import com.jasonfelix.in.pomodoro.Entity.User;
import com.jasonfelix.in.pomodoro.dao.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findById(int id) {
        Optional<User> result = userRepository.findById(id);
        User user = null;
        if(result.isPresent()){
            user = result.get();
        }else{
            throw new RuntimeException("User not found");
        }
        return user;
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Transactional
    @Override
    public void DeleteById(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public int findUserByEmailAddress(String emailAddress) {
        Optional<User> result = userRepository.findUserByEmailAddress(emailAddress);
        return result.map(User::getId).orElse(-1);
    }
}
