package com.challenge.models;

import lombok.Data;

import java.util.List;

@Data
public class Employee {
    private String name;
    private int id;
    private List<Dependent> dependents;

}
