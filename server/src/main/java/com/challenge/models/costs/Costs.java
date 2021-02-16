package com.challenge.models.costs;

import lombok.Data;

import java.util.List;

@Data
public class Costs {
    private int annualTotalEmployeeSalaryCost;
    private int annualTotalEmployeeDeductions;
    private int annualRemainingEmployeeSalary;
    private List<CostPerEmployee> costsPerEmployee;
}
