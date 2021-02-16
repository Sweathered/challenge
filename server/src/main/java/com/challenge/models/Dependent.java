package com.challenge.models;

import com.challenge.models.costs.Benefitable;
import lombok.Data;

@Data
public class Dependent extends Benefitable {
//    private String name;
//    private int id;

    @Override
    public int getDeduction() {
        return 500;
    }
}
