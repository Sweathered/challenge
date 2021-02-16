package com.challenge.models.costs;

public class NameStartsWithADiscountDecorator extends DiscountDecorator {
    private DeductionCalculator deductionCalculator;

    public NameStartsWithADiscountDecorator(DeductionCalculator deductionCalculator) {
        this.deductionCalculator = deductionCalculator;
    }

    @Override
    public int getDeduction() {
        return (int) Math.round(deductionCalculator.getDeduction() * .9);
    }
}
