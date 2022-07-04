package com.tmi.controller;


import com.tmi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

//    @PostMapping("/login")
//    public User userLogin(@RequestBody User userDto, HttpSession httpSession){
//
//    }
}
