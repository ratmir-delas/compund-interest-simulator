package com.prospero.simulator.entities;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    private String name;
    private String email;
    private String password;
    private String language;
    private String currency;

    public User() {
    }

    public User(String name, String email, String password, String language, String currency) {
        this.name = name;
        this.email= email;
        this.password = password;
        this.language = language;
        this.currency = currency;
    }

    public User(Long user_id, String name, String email, String password, String language, String currency) {
        this.user_id = user_id;
        this.name = name;
        this.email= email;
        this.password = password;
        this.language = language;
        this.currency = currency;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long id) {
        this.user_id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(user_id, user.user_id) && Objects.equals(name, user.name) && Objects.equals(email, user.email) && Objects.equals(password, user.password) && Objects.equals(language, user.language) && Objects.equals(currency, user.currency);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_id, name, email, password, language, currency);
    }

    @Override
    public String toString() {
        return "User{" +
                "user_id=" + user_id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", language='" + language + '\'' +
                ", currency='" + currency + '\'' +
                '}';
    }
}