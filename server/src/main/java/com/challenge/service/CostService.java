package com.challenge.service;

import com.challenge.models.Employee;
import com.challenge.models.costs.Benefitable;
import com.challenge.models.costs.CostPerEmployee;
import com.challenge.models.costs.Costs;
import com.challenge.models.costs.NameStartsWithADecorator;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CostService {

    private static final int EMPLOYEE_PAYCHECK_AMOUNT = 2000;
    private static final int PAYCHECKS_IN_YEAR = 26;

    /*
    Annual Total Employee Salary Cost = (number of Employees) * (per-employee paycheck per period) * (number of paychecks in year)
    Annual Total Employee Deductions = calculated based on number of dependents and special rules
    Annual Remaining Employee Salary = (Annual Total Employee Salary Cost) - (Annual Total Employee Deductions)
     */
    public Costs calculateCosts(List<Employee> employees) {
        //TODO refactor this to use decorator pattern or strategy pattern
        List<CostPerEmployee> costsPerEmployee = new ArrayList<>();

        int annualTotalEmployeeDeductions = 0;
        for (Benefitable employee : employees) {
            if (employee.getName().toUpperCase().startsWith("A")) {
                employee = new NameStartsWithADecorator(employee);
            }

            employee.addToAnnualTotalEmployeeDeductions(employee.getDeduction());

            //TODO handle dependents
            for (Benefitable dependent : employee.getDependents()) {
                if (dependent.getName().toUpperCase().startsWith("A")) {
                    dependent = new NameStartsWithADecorator(dependent);
                }
                employee.addToAnnualTotalEmployeeDeductions(dependent.getDeduction());
            }

//            CostPerEmployee costPerEmployee = new CostPerEmployee();
//            costPerEmployee.setName(employee.getName());
//            costPerEmployee.setAnnualTotalEmployeeDeductions(employee.getDeduction());
//            if (employee.getName().toUpperCase().startsWith("A")) {
//                costPerEmployee.addToAnnualTotalEmployeeDeductions(900);
//            } else {
//                costPerEmployee.addToAnnualTotalEmployeeDeductions(1000);
//            }


        }

        annualTotalEmployeeDeductions = employees.stream().mapToInt(Employee::getAnnualTotalEmployeeDeductions).sum();

        int annualTotalEmployeeSalaryCost = employees.size() * EMPLOYEE_PAYCHECK_AMOUNT * PAYCHECKS_IN_YEAR;

        Costs costs = new Costs();
        costs.setAnnualTotalEmployeeSalaryCost(annualTotalEmployeeSalaryCost);
        costs.setAnnualTotalEmployeeDeductions(annualTotalEmployeeDeductions);
        costs.setAnnualRemainingEmployeeSalary(annualTotalEmployeeSalaryCost - annualTotalEmployeeDeductions);

        costs.setCostsPerEmployee(costsPerEmployee);
        return costs;
    }
}
