package com.prospero.simulator.services;

import com.prospero.simulator.repositories.CalculationRepository;
import com.prospero.simulator.entities.Calculation;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CalculationService {

    private final CalculationRepository calculationRepository;

    public CalculationService(CalculationRepository calculationRepository) {
        this.calculationRepository = calculationRepository;
    }

    public Calculation getCalculation(Long id) {
        return calculationRepository.findById(id).orElse(null);
    }

    public boolean isCalculationStored(Calculation calculation) {
        List<Calculation> calculations = getAllCalculationsByUserId(calculation.getUser().getUser_id());
        for (Calculation c : calculations) {
            if (c.equals(calculation)) {
                return true;
            }
        }
        return false;
    }

    public List<Calculation> getAllCalculations() {
        return calculationRepository.findAll();
    }

    public List<Calculation> getAllCalculationsByUserId(Long userId) {
        return calculationRepository.findByUserId(userId);
    }

    // countByUserId() is used in CalculationController.java
    public int countByUserId(Long userId) {
        return calculationRepository.countByUserId(userId);
    }

    public void addCalculation(Calculation calculation) {
        calculationRepository.save(calculation);
    }

    public void deleteCalculation(Long id) {
        calculationRepository.deleteById(id);
    }

    public void updateCalculation(Long id, Calculation updatedCalculation) {
        Calculation calculation = calculationRepository.findById(id).orElse(null);
        if (calculation != null) {
            calculation.setName(updatedCalculation.getName());
            calculation.setInitialAmount(updatedCalculation.getInitialAmount());
            calculation.setContributionAmount(updatedCalculation.getContributionAmount());
            calculation.setContributionFrequency(updatedCalculation.getContributionFrequency());
            calculation.setInvestmentPeriod(updatedCalculation.getInvestmentPeriod());
            calculation.setEstimatedReturn(updatedCalculation.getEstimatedReturn());
            calculation.setEstimatedInflation(updatedCalculation.getEstimatedInflation());
            calculation.setEstimatedTax(updatedCalculation.getEstimatedTax());
            calculation.setCapitalizationFrequency(updatedCalculation.getCapitalizationFrequency());
            calculation.setUser(updatedCalculation.getUser());

            calculationRepository.save(calculation);
        }
    }
}