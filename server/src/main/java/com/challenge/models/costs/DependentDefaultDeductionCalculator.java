package com.challenge.models.costs;

public class DependentDefaultDeductionCalculator extends DeductionCalculator {
    @Override
    public int getDeduction() {
        return 500;
    }
}
