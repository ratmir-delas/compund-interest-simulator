package com.prospero.simulator.Calculation;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class Calculation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int initialAmount;
    private int contributionAmount;
    private int contributionFrequency;
    private int investmentPeriod;
    private int estimatedReturn;
    private int estimatedInflation;
    private int estimatedTax;
    private int capitalizationFrequency;
    private Long userId;

    public Calculation() {
    }

    public Calculation(int initialAmount, int contributionAmount, int contributionFrequency, int investmentPeriod, int estimatedReturn, int estimatedInflation, int estimatedTax, int capitalizationFrequency, Long userId) {
        this.initialAmount = initialAmount;
        this.contributionAmount = contributionAmount;
        this.contributionFrequency = contributionFrequency;
        this.investmentPeriod = investmentPeriod;
        this.estimatedReturn = estimatedReturn;
        this.estimatedInflation = estimatedInflation;
        this.estimatedTax = estimatedTax;
        this.capitalizationFrequency = capitalizationFrequency;
        this.userId = userId;
    }

    public Calculation(Long id, int initialAmount, int contributionAmount, int contributionFrequency, int investmentPeriod, int estimatedReturn, int estimatedInflation, int estimatedTax, int capitalizationFrequency, Long userId) {
        this.id = id;
        this.initialAmount = initialAmount;
        this.contributionAmount = contributionAmount;
        this.contributionFrequency = contributionFrequency;
        this.investmentPeriod = investmentPeriod;
        this.estimatedReturn = estimatedReturn;
        this.estimatedInflation = estimatedInflation;
        this.estimatedTax = estimatedTax;
        this.capitalizationFrequency = capitalizationFrequency;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getInitialAmount() {
        return initialAmount;
    }

    public void setInitialAmount(int initialAmount) {
        this.initialAmount = initialAmount;
    }

    public int getContributionAmount() {
        return contributionAmount;
    }

    public void setContributionAmount(int contributionAmount) {
        this.contributionAmount = contributionAmount;
    }

    public int getContributionFrequency() {
        return contributionFrequency;
    }

    public void setContributionFrequency(int contributionFrequency) {
        this.contributionFrequency = contributionFrequency;
    }

    public int getInvestmentPeriod() {
        return investmentPeriod;
    }

    public void setInvestmentPeriod(int investmentPeriod) {
        this.investmentPeriod = investmentPeriod;
    }

    public int getEstimatedReturn() {
        return estimatedReturn;
    }

    public void setEstimatedReturn(int estimatedReturn) {
        this.estimatedReturn = estimatedReturn;
    }

    public int getEstimatedInflation() {
        return estimatedInflation;
    }

    public void setEstimatedInflation(int estimatedInflation) {
        this.estimatedInflation = estimatedInflation;
    }

    public int getEstimatedTax() {
        return estimatedTax;
    }

    public void setEstimatedTax(int estimatedTax) {
        this.estimatedTax = estimatedTax;
    }

    public int getCapitalizationFrequency() {
        return capitalizationFrequency;
    }

    public void setCapitalizationFrequency(int capitalizationFrequency) {
        this.capitalizationFrequency = capitalizationFrequency;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Calculation that = (Calculation) o;
        return initialAmount == that.initialAmount && contributionAmount == that.contributionAmount && contributionFrequency == that.contributionFrequency && investmentPeriod == that.investmentPeriod && estimatedReturn == that.estimatedReturn && estimatedInflation == that.estimatedInflation && estimatedTax == that.estimatedTax && capitalizationFrequency == that.capitalizationFrequency && Objects.equals(id, that.id) && Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, initialAmount, contributionAmount, contributionFrequency, investmentPeriod, estimatedReturn, estimatedInflation, estimatedTax, capitalizationFrequency, userId);
    }

    @Override
    public String toString() {
        return "Calculation{" +
                "id=" + id +
                ", initialAmount=" + initialAmount +
                ", contributionAmount=" + contributionAmount +
                ", contributionFrequency=" + contributionFrequency +
                ", investmentPeriod=" + investmentPeriod +
                ", estimatedReturn=" + estimatedReturn +
                ", estimatedInflation=" + estimatedInflation +
                ", estimatedTax=" + estimatedTax +
                ", capitalizationFrequency=" + capitalizationFrequency +
                ", userId=" + userId +
                '}';
    }
}
