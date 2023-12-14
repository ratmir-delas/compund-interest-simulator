package com.example.demo_spring;

import com.example.demo_spring.User.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@RestController
public class Application {

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

}