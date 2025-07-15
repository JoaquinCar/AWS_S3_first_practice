package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WelcomeController {

    /**
     * Redirect root URL to the frontend interface
     */
    @GetMapping("/")
    public String welcome() {
        return "redirect:/index.html";
    }
}