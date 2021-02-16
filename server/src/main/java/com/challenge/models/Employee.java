package com.challenge.models;

import com.challenge.models.costs.DeductionCalculator;
import com.challenge.models.costs.EmployeeDefaultDeductionCalculator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class Employee {
    private String name;
    private int id;

    @JsonIgnore
    private DeductionCalculator deductionCalculator = new EmployeeDefaultDeductionCalculator();
    private List<Dependent> dependents = new ArrayList<>();

    public Employee(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public void addDeductionsForSelf() {
        this.deductionCalculator.addToAnnualTotalEmployeeDeductions(this.deductionCalculator.getDeduction());
    }

    public void addDeductionsForDependent(Dependent dependent) {
        this.deductionCalculator.addToAnnualTotalEmployeeDeductions(dependent.getDeductionCalculator().getDeduction());
    }

    public void applyDiscounts() {
        this.deductionCalculator = this.deductionCalculator.determineDeductionCalculators(this.getName(), this.getDeductionCalculator());
    }

}
