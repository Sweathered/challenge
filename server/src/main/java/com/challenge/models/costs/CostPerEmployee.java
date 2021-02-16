package com.challenge.models.costs;

import lombok.Data;

@Data
public class CostPerEmployee {
    private int annualTotalEmployeeDeductions;
    private String name;

    public void addToAnnualTotalEmployeeDeductions(int amountToAdd) {
        annualTotalEmployeeDeductions += amountToAdd;
    }
}
