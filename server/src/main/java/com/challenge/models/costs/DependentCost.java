package com.challenge.models.costs;

public class DependentCost extends Benefitable {
    @Override
    public int getDeduction() {
        return 500;
    }
}
