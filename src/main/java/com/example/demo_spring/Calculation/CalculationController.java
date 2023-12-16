package com.example.demo_spring.Calculation;

import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/")
    public List<Calculation> getCalculations() {
        return calculationService.getAllCalculations();
    }

    @GetMapping("/{id}")
    public Calculation getCalculation(@PathVariable Long id) {
        return calculationService.getCalculation(id);
    }

    @PostMapping("/")
    public void addCalculation(@RequestBody Calculation calculation) {
        calculationService.addCalculation(calculation);
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