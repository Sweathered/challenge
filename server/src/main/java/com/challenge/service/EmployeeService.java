package com.challenge.service;

import com.challenge.models.Costs;
import com.challenge.models.Dependent;
import com.challenge.models.Employee;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {
    List<Employee> employees = defineSampleEmployees();

    private static final int EMPLOYEE_PAYCHECK_AMOUNT = 2000;
    private static final int PAYCHECKS_IN_YEAR = 26;

    public List<Employee> getEmployees() {
        return employees;
    }

    public List<Employee> defineSampleEmployees() {
        employees = new ArrayList<>();
        Employee employee = new Employee();
        employee.setName("Michael Peters");
        employee.setId(1);
        employee.setDependents(defineDependents());
        employees.add(employee);
        return employees;
    }

    private List<Dependent> defineDependents() {
        List<Dependent> dependents = new ArrayList<>();
        Dependent dependent = new Dependent();
        dependent.setName("Amy Peters");
        dependent.setId(1);
        dependents.add(dependent);
        return dependents;
    }

    public void saveEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    /*
    Annual Total Employee Salary Cost = (number of Employees) * (per-employee paycheck per period) * (number of paychecks in year)
    Annual Total Employee Deductions = calculated based on number of dependents and special rules
    Annual Remaining Employee Salary = (Annual Total Employee Salary Cost) - (Annual Total Employee Deductions)
     */
    public Costs calculateCosts(List<Employee> employees) {
        //TODO refactor this to use decorator pattern or strategy pattern
        int annualTotalEmployeeDeductions = 0;
        for (Employee employee : employees) {
            if (employee.getName().toUpperCase().startsWith("A")) {
                annualTotalEmployeeDeductions += 900;
            } else {
                annualTotalEmployeeDeductions += 1000;
            }
            for (Dependent dependent : employee.getDependents()) {
                if (dependent.getName().toUpperCase().startsWith("A")) {
                    annualTotalEmployeeDeductions += 450;
                } else {
                    annualTotalEmployeeDeductions += 500;
                }
            }
        }

        int annualTotalEmployeeSalaryCost = employees.size() * EMPLOYEE_PAYCHECK_AMOUNT * PAYCHECKS_IN_YEAR;

        Costs costs = new Costs();
        costs.setAnnualTotalEmployeeSalaryCost(annualTotalEmployeeSalaryCost);
        costs.setAnnualTotalEmployeeDeductions(annualTotalEmployeeDeductions);
        costs.setAnnualRemainingEmployeeSalary(annualTotalEmployeeSalaryCost - annualTotalEmployeeDeductions);
        return costs;
    }
}
