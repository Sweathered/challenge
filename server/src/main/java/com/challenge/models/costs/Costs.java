package com.challenge.models.costs;

import lombok.Data;

import java.util.List;

@Data
public class Costs {
    public int annualTotalEmployeeSalaryCost;
    public int annualTotalEmployeeDeductions;
    public int annualRemainingEmployeeSalary;
    private List<CostPerEmployee> costsPerEmployee;
}
