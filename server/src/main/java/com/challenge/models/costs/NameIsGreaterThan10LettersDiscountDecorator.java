package com.challenge.models.costs;

public class NameIsGreaterThan10LettersDiscountDecorator extends DiscountDecorator {
    private DeductionCalculator deductionCalculator;

    public NameIsGreaterThan10LettersDiscountDecorator(DeductionCalculator deductionCalculator) {
        this.deductionCalculator = deductionCalculator;
    }

    @Override
    public int getDeduction() {
        return (int) Math.round(deductionCalculator.getDeduction() * .5);
    }
}
