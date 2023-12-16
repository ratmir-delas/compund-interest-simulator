package com.example.demo_spring.User;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

        private final UserRepository userRepository;

        public UserService(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

        public User getUser(Long id) {
            return userRepository.findById(id).orElse(null);
        }

        public List<User> getAllUsers() {
            return userRepository.findAll();
        }

        public void addUser(User user) {
            userRepository.save(user);
        }

        public void deleteUser(Long id) {
            userRepository.deleteById(id);
        }

        public void updateUser(Long id, User updatedUser) {
            User user = userRepository.findById(id).orElse(null);
            if (user != null) {
                user.setName(updatedUser.getName());
                user.setEmail(updatedUser.getEmail());
                user.setPassword(updatedUser.getPassword());
                userRepository.save(user);
            }
        }
}
