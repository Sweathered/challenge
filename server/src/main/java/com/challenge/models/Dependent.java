package com.challenge.models;

import com.challenge.models.costs.Benefitable;

import java.util.ArrayList;
import java.util.List;

public class Dependent extends Benefitable {
//    private String name;
//    private int id;

    @Override
    public int getDeduction() {
        return 500;
    }

    public List<Dependent> getDependents() {
        System.out.println("Dependents can't have dependents!");
        return new ArrayList<>();
    }
}
