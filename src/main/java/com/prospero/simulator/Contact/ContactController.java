package com.prospero.simulator.Contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/contact")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping("/")
    public List<Contact> getContact() {
        return contactService.getAllContacts();
    }

    @GetMapping("/{id}")
    public Contact getContact(@PathVariable Long id) {
        return contactService.getContact(id);
    }

    @PostMapping("/")
    public void addContact(@RequestBody Contact contact) {
        contactService.addContact(contact);
    }

    @DeleteMapping("/{id}")
    public void deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
    }

    @PutMapping("/{id}")
    public void updateContact(@PathVariable Long id, @RequestBody Contact updatedContact) {
        contactService.updateContact(id, updatedContact);
    }
}
