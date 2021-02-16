package com.challenge.models;

import com.challenge.models.costs.Benefitable;
import lombok.Data;

import java.util.List;

@Data
public class Employee extends Benefitable {
//    private String name;
//    private int id;
    private List<Dependent> dependents;

    @Override
    public int getDeduction() {
        return 1000;
    }

}
