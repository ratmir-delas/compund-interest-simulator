package com.example.demo_spring;

import com.example.demo_spring.User.User;
import com.example.demo_spring.User.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@RestController
@RequestMapping(path = "api/v1")
public class Application {

	private final UserRepository userRepository;

    public Application(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@GetMapping("/users")
	public List<User> getUsers() {
		return List.of(
				new User("Maria",
						"maria@gmail.com",
						"12345678"),
				new User("Alex",
						"alex@gmail.com",
						"12345678"),
				new User("Sophie",
						"sophie@gmail.com",
						"12345678")
		);
	}

	@GetMapping("/user")
	public User getUser() {
		return new User("Maria",
				"maria@gmail.com",
				"12345678");
	}

	@GetMapping("/users_all")
	public List<User> getUsers2() {
		return userRepository.findAll();
	}

}