package com.challenge.models;

import com.challenge.models.costs.DeductionCalculator;
import com.challenge.models.costs.EmployeeDefaultDeductionCalculator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Employee {
    private String name;

    @Id
    private int id;

    @Getter
    @Setter(AccessLevel.NONE)
    @Transient
    private int annualTotalEmployeeDeductions;

    @JsonIgnore
    @Transient
    private DeductionCalculator deductionCalculator = new EmployeeDefaultDeductionCalculator();

    @OneToMany
    private List<Dependent> dependents = new ArrayList<>();

    public Employee(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public void addToAnnualTotalEmployeeDeductions(int amountToAdd) {
        annualTotalEmployeeDeductions += amountToAdd;
    }

    public void addDeductionsForSelf() {
        this.addToAnnualTotalEmployeeDeductions(this.deductionCalculator.getDeduction());
    }

    public void addDeductionsForDependent(Dependent dependent) {
        this.addToAnnualTotalEmployeeDeductions(dependent.getDeductionCalculator().getDeduction());
    }

    public void applyDiscounts() {
        this.deductionCalculator = this.deductionCalculator.determineDeductionCalculators(this.getName(), this.getDeductionCalculator());
    }
}
