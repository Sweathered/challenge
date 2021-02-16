package com.challenge.models;

import com.challenge.models.costs.DeductionCalculator;
import com.challenge.models.costs.DependentDefaultDeductionCalculator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Dependent {
    private String name;
    private int id;
    @JsonIgnore
    private DeductionCalculator deductionCalculator = new DependentDefaultDeductionCalculator();

    public Dependent(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public void applyDiscounts() {
        this.deductionCalculator = this.deductionCalculator.determineDeductionCalculators(this.getName(), this.getDeductionCalculator());
    }
}
