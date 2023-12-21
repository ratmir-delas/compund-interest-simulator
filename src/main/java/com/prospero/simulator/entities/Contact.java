package com.prospero.simulator.entities;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contact_id;
    private String name;
    private String email;
    private String message;
    private long sentDateTime;

    public Contact() {
    }

    public Contact(String name, String email, String message, long sentDateTime) {
        this.name = name;
        this.email = email;
        this.message = message;
        this.sentDateTime = sentDateTime;
    }

    public Contact(long contact_id, String name, String email, String message, long sentDateTime) {
        this.contact_id = contact_id;
        this.name = name;
        this.email = email;
        this.message = message;
        this.sentDateTime = sentDateTime;
    }

    public Long getContact_id() {
        return contact_id;
    }

    public void setContact_id(Long id) {
        this.contact_id = id;
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public long getSentDateTime() {
        return sentDateTime;
    }

    public void setSentDateTime(long sentDateTime) {
        this.sentDateTime = sentDateTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Contact contact = (Contact) o;
        return sentDateTime == contact.sentDateTime && Objects.equals(contact_id, contact.contact_id) && Objects.equals(name, contact.name) && Objects.equals(email, contact.email) && Objects.equals(message, contact.message);
    }

    @Override
    public int hashCode() {
        return Objects.hash(contact_id, name, email, message, sentDateTime);
    }

    @Override
    public String toString() {
        return "Contact{" +
                "contact_id=" + contact_id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", message='" + message + '\'' +
                ", sentDateTime=" + sentDateTime +
                '}';
    }
}