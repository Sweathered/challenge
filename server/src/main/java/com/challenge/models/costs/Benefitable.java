package com.challenge.models.costs;

import lombok.Data;

@Data
public abstract class Benefitable {

    public abstract int getDeduction();

    private String name;
    private int id;
}
