package com.challenge.models.costs;

import lombok.Data;

@Data
public abstract class DeductionCalculator {

    public abstract int getDeduction();

    private int annualTotalEmployeeDeductions;
    private String name;
    private int id;

    public void addToAnnualTotalEmployeeDeductions(int amountToAdd) {
        annualTotalEmployeeDeductions += amountToAdd;
    }

    public DeductionCalculator determineDeductionCalculators(String name, DeductionCalculator deductionCalculator) {
        if (name.toUpperCase().startsWith("A")) {
            deductionCalculator = new NameStartsWithADiscountDecorator(deductionCalculator);
        }
        //TODO uncomment in code review
//        if (name.length() > 10) {
//            deductionCalculator = new NameIsGreaterThan10LettersDiscountDecorator(deductionCalculator);
//        }
        return deductionCalculator;
    }
}
