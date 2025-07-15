package com.example.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CustomErrorController implements ErrorController {

    /**
     * Handle all error paths and redirect to our custom error page
     */
    @RequestMapping("/error")
    public String handleError() {
        return "redirect:/error.html";
    }
}