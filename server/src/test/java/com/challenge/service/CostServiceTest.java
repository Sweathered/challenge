package com.challenge.service;

import com.challenge.models.Dependent;
import com.challenge.models.Employee;
import com.challenge.models.costs.Costs;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

@ExtendWith(SpringExtension.class)
public class CostServiceTest {

    @InjectMocks
    private CostService costService;

    @Test
    public void calculateCostsWorksForASingleEmployeeWithNoDependent() {
        List<Employee> employeeList = defineEmployeeList();
        employeeList.get(0).setDependents(new ArrayList<>());

        Costs costs = costService.calculateCosts(employeeList);

        assertThat(costs.getAnnualTotalEmployeeSalaryCost(), equalTo(52000));
        assertThat(costs.getAnnualTotalEmployeeDeductions(), equalTo(1000));
        assertThat(costs.getAnnualRemainingEmployeeSalary(), equalTo(51000));
    }

    @Test
    public void calculateCostsWorksForASingleEmployeeWhoseNameStartsWithAWithNoDependents() {
        List<Employee> employeeList = defineEmployeeList();
        employeeList.get(0).setDependents(new ArrayList<>());
        employeeList.get(0).setName("Aaron Smith");


        Costs costs = costService.calculateCosts(employeeList);

        assertThat(costs.getAnnualTotalEmployeeSalaryCost(), equalTo(52000));
        assertThat(costs.getAnnualRemainingEmployeeSalary(), equalTo(51100));
        assertThat(costs.getAnnualTotalEmployeeDeductions(), equalTo(900));
    }


    @Test
    public void calculateCostsWorksForASingleEmployeeWithASingleDependent() {
        List<Employee> employeeList = defineEmployeeList();

        Costs costs = costService.calculateCosts(employeeList);

        assertThat(costs.getAnnualTotalEmployeeSalaryCost(), equalTo(52000));
        assertThat(costs.getAnnualRemainingEmployeeSalary(), equalTo(50500));
        assertThat(costs.getAnnualTotalEmployeeDeductions(), equalTo(1500));
    }


    private List<Employee> defineEmployeeList() {
        List<Employee> employeeList = new ArrayList<>();

        //$1000 deduction
        Employee employee = new Employee();
        employee.setName("Bob Smith");
        employee.setId(1);
        List<Dependent> dependents = new ArrayList<>();

        //$500 deduction
        Dependent dependent = new Dependent();
        dependent.setName("Terry Smith");
        dependent.setId(1);
        dependents.add(dependent);
        employee.setDependents(dependents);
        employeeList.add(employee);
        return employeeList;
    }

}