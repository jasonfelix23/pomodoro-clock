package com.jasonfelix.in.pomodoro.rest;

import com.jasonfelix.in.pomodoro.Entity.User;
import com.jasonfelix.in.pomodoro.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1")
public class UserRestController {
    private UserService userService;

    public UserRestController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> findAll(){
        return userService.findAll();
    }

    @GetMapping("/users/{userId}")
    public User findById(@PathVariable int userId){
        User user = userService.findById(userId);
        if(user == null){
            throw new RuntimeException("User not found");
        }
        return user;
    }

    @PostMapping("/user")
    public User save(@RequestBody User user){
        user.setId(0);
        User dbUser = userService.save(user);
        return dbUser;
    }

    @GetMapping("/user/exists")
    public int userExists(@RequestParam("email") String email){
        return userService.findUserByEmailAddress(email);
    }
}
