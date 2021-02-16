package com.challenge.models.costs;

public class EmployeeDefaultDeductionCalculator extends DeductionCalculator {
    @Override
    public int getDeduction() {
        return 1000;
    }

}
