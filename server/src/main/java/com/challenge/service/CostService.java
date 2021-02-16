package com.challenge.service;

import com.challenge.models.Dependent;
import com.challenge.models.Employee;
import com.challenge.models.costs.Costs;
import org.springframework.stereotype.Service;

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
        for (Employee employee : employees) {
            employee.applyDiscounts();
            employee.addDeductionsForSelf();

            for (Dependent dependent : employee.getDependents()) {
                dependent.applyDiscounts();
                employee.addDeductionsForDependent(dependent);
            }
        }

        int annualTotalEmployeeDeductions = employees.stream().mapToInt(employee -> employee.getDeductionCalculator().getAnnualTotalEmployeeDeductions()).sum();
        int annualTotalEmployeeSalaryCost = employees.size() * EMPLOYEE_PAYCHECK_AMOUNT * PAYCHECKS_IN_YEAR;

        Costs costs = new Costs();
        costs.setAnnualTotalEmployeeSalaryCost(annualTotalEmployeeSalaryCost);
        costs.setAnnualTotalEmployeeDeductions(annualTotalEmployeeDeductions);
        costs.setAnnualRemainingEmployeeSalary(annualTotalEmployeeSalaryCost - annualTotalEmployeeDeductions);
        costs.setCostsPerEmployee(employees);
        return costs;
    }
}
