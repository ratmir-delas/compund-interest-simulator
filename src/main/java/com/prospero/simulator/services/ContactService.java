package com.prospero.simulator.services;

import com.prospero.simulator.repositories.ContactRepository;
import com.prospero.simulator.entities.Contact;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public Contact getContact(Long id) {
        return contactRepository.findById(id).orElse(null);
    }

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public Contact addContact(Contact contact) {
        return contactRepository.save(contact);
    }

    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }

    public void updateContact(Long id, Contact updatedContact) {
        Contact contact = contactRepository.findById(id).orElse(null);
        if (contact != null) {
            contact.setName(updatedContact.getName());
            contact.setEmail(updatedContact.getEmail());
            contact.setMessage(updatedContact.getMessage());
            contact.setSentDateTime(updatedContact.getSentDateTime());
            contactRepository.save(contact);
        }
    }
}
