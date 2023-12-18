package com.prospero.simulator.Calculation;

import com.prospero.simulator.User.User;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Calculation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "calculation_id")
    private Long calculation_id;
    private int initialAmount;
    private int contributionAmount;
    private int contributionFrequency;
    private int investmentPeriod;
    private int estimatedReturn;
    private int estimatedInflation;
    private int estimatedTax;
    private int capitalizationFrequency;
    @ManyToOne
    @JoinColumn(name = "calculation_user_id", referencedColumnName = "user_id")
    private User user;

    public Calculation() {
    }

    public Calculation(int initialAmount, int contributionAmount, int contributionFrequency, int investmentPeriod, int estimatedReturn, int estimatedInflation, int estimatedTax, int capitalizationFrequency, User user) {
        this.initialAmount = initialAmount;
        this.contributionAmount = contributionAmount;
        this.contributionFrequency = contributionFrequency;
        this.investmentPeriod = investmentPeriod;
        this.estimatedReturn = estimatedReturn;
        this.estimatedInflation = estimatedInflation;
        this.estimatedTax = estimatedTax;
        this.capitalizationFrequency = capitalizationFrequency;
        this.user = user;
    }

    public Calculation(Long calculation_id, int initialAmount, int contributionAmount, int contributionFrequency, int investmentPeriod, int estimatedReturn, int estimatedInflation, int estimatedTax, int capitalizationFrequency, User user) {
        this.calculation_id = calculation_id;
        this.initialAmount = initialAmount;
        this.contributionAmount = contributionAmount;
        this.contributionFrequency = contributionFrequency;
        this.investmentPeriod = investmentPeriod;
        this.estimatedReturn = estimatedReturn;
        this.estimatedInflation = estimatedInflation;
        this.estimatedTax = estimatedTax;
        this.capitalizationFrequency = capitalizationFrequency;
        this.user = user;
    }

    public Long getCalculation_id() {
        return calculation_id;
    }

    public void setCalculation_id(Long id) {
        this.calculation_id = id;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Calculation that = (Calculation) o;
        return initialAmount == that.initialAmount && contributionAmount == that.contributionAmount && contributionFrequency == that.contributionFrequency && investmentPeriod == that.investmentPeriod && estimatedReturn == that.estimatedReturn && estimatedInflation == that.estimatedInflation && estimatedTax == that.estimatedTax && capitalizationFrequency == that.capitalizationFrequency && Objects.equals(calculation_id, that.calculation_id) && Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(calculation_id, initialAmount, contributionAmount, contributionFrequency, investmentPeriod, estimatedReturn, estimatedInflation, estimatedTax, capitalizationFrequency, user);
    }

    @Override
    public String toString() {
        return "Calculation{" +
                "calculation_id=" + calculation_id +
                ", initialAmount=" + initialAmount +
                ", contributionAmount=" + contributionAmount +
                ", contributionFrequency=" + contributionFrequency +
                ", investmentPeriod=" + investmentPeriod +
                ", estimatedReturn=" + estimatedReturn +
                ", estimatedInflation=" + estimatedInflation +
                ", estimatedTax=" + estimatedTax +
                ", capitalizationFrequency=" + capitalizationFrequency +
                ", user=" + user +
                '}';
    }
}
