package com.prospero.simulator.repositories;

import com.prospero.simulator.entities.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
