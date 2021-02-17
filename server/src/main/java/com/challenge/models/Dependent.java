package com.challenge.models;

import com.challenge.models.costs.DeductionCalculator;
import com.challenge.models.costs.DependentDefaultDeductionCalculator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

@Data
@NoArgsConstructor
@Entity
public class Dependent {
    private String name;

    @Id
    private int id;

    @JsonIgnore
    @Transient
    private DeductionCalculator deductionCalculator = new DependentDefaultDeductionCalculator();

    public Dependent(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public void applyDiscounts() {
        this.deductionCalculator = this.deductionCalculator.determineDeductionCalculators(this.getName(), this.getDeductionCalculator());
    }
}
