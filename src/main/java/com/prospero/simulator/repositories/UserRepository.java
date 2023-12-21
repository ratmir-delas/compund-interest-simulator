package com.prospero.simulator.repositories;

import com.prospero.simulator.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
