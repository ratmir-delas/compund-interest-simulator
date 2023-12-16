package com.example.demo_spring.Calculation;

import com.example.demo_spring.User.User;
import com.example.demo_spring.User.UserRepository;
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

    public List<Calculation> getAllCalculations() {
        return calculationRepository.findAll();
    }

    public List<Calculation> getAllCalculationsByUserId(Long userId) {
        return calculationRepository.findByUserId(userId);
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
            calculation.setInitialAmount(updatedCalculation.getInitialAmount());
            calculation.setContributionAmount(updatedCalculation.getContributionAmount());
            calculation.setContributionFrequency(updatedCalculation.getContributionFrequency());
            calculation.setInvestmentPeriod(updatedCalculation.getInvestmentPeriod());
            calculation.setEstimatedReturn(updatedCalculation.getEstimatedReturn());
            calculation.setEstimatedInflation(updatedCalculation.getEstimatedInflation());
            calculation.setEstimatedTax(updatedCalculation.getEstimatedTax());
            calculation.setCapitalizationFrequency(updatedCalculation.getCapitalizationFrequency());
            calculation.setUserId(updatedCalculation.getUserId());

            calculationRepository.save(calculation);
        }
    }
}