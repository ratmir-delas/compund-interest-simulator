package com.prospero.simulator.controllers;

import com.prospero.simulator.entities.Calculation;
import com.prospero.simulator.services.CalculationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/calculations")
public class CalculationController {

    private final CalculationService calculationService;

    @Autowired
    public CalculationController(CalculationService calculationService) {
        this.calculationService = calculationService;
    }

    @Value("${app.maxCalculations}")
    private int maxCalculations;

    @GetMapping("/")
    public List<Calculation> getCalculations() {
        return calculationService.getAllCalculations();
    }

    @GetMapping("/{id}")
    public Calculation getCalculation(@PathVariable Long id) {
        return calculationService.getCalculation(id);
    }

    @GetMapping("/user/{userId}")
    public List<Calculation> getCalculationsByUserId(@PathVariable Long userId) {
        return calculationService.getAllCalculationsByUserId(userId);
    }

    @PostMapping("/")
    public ResponseEntity<?> addCalculation(@RequestBody Calculation calculation) {
        if (calculationService.countByUserId(calculation.getUser().getUser_id()) >= maxCalculations) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Max calculation limit reached");
        }
        calculationService.addCalculation(calculation);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public void deleteCalculation(@PathVariable Long id) {
        calculationService.deleteCalculation(id);
    }

    @PutMapping("/{id}")
    public void updateCalculation(@PathVariable Long id, @RequestBody Calculation updatedCalculation) {
        calculationService.updateCalculation(id, updatedCalculation);
    }
}