package com.challenge.models.costs;

public class NameStartsWithADecorator extends DiscountDecorator {
    private Benefitable benefitable;

    public NameStartsWithADecorator(Benefitable benefitable) {
        this.benefitable = benefitable;
    }

    @Override
    public int getDeduction() {
        return (int) Math.round(benefitable.getDeduction() * .9);
    }
}
