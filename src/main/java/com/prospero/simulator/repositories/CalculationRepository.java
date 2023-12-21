package com.prospero.simulator.repositories;

import com.prospero.simulator.entities.Calculation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CalculationRepository extends JpaRepository<Calculation, Long> {
    @Query("SELECT c FROM Calculation c WHERE c.user = ?1")
    List<Calculation> findByUserId(Long userId);
}
