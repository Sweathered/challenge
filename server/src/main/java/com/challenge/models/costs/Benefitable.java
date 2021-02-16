package com.challenge.models.costs;

import com.challenge.models.Dependent;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public abstract class Benefitable {

    public abstract int getDeduction();

    private int annualTotalEmployeeDeductions;
    private String name;
    private int id;
    private List<Dependent> dependents = new ArrayList<>();

    public void addToAnnualTotalEmployeeDeductions(int amountToAdd) {
        annualTotalEmployeeDeductions += amountToAdd;
    }
}
