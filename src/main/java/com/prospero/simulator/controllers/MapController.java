package com.prospero.simulator.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MapController {

    @GetMapping("/register")
    public String registrationPage() {
        return "register";
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/simulator")
    public String simulatorPage() {
        return "simulator";
    }

    @GetMapping("/about")
    public String aboutPage() {
        return "about";
    }

    @GetMapping("/updates")
    public String updatesPage() {
        return "updates";
    }

    @GetMapping("/contact")
    public String contactPage() {
        return "contact";
    }

}
