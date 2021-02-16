package com.challenge.service;

import com.challenge.models.Dependent;
import com.challenge.models.Employee;
import com.challenge.models.costs.Costs;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

@ExtendWith(SpringExtension.class)
public class CostServiceTest {

    @InjectMocks
    private CostService costService;

    @Test
    public void calculateCostsWorksForASingleEmployeeWithNoDependent() {
        List<Employee> employeeList = defineSimpleEmployeeList();
        employeeList.get(0).setDependents(new ArrayList<>());

        Costs costs = costService.calculateCosts(employeeList);

        assertThat(costs.getAnnualTotalEmployeeSalaryCost(), equalTo(52000));
        assertThat(costs.getAnnualTotalEmployeeDeductions(), equalTo(1000));
        assertThat(costs.getAnnualRemainingEmployeeSalary(), equalTo(51000));
    }

    @Test
    public void calculateCostsWorksForASingleEmployeeWhoseNameStartsWithAWithNoDependents() {
        List<Employee> employeeList = defineSimpleEmployeeList();
        employeeList.get(0).setDependents(new ArrayList<>());
        employeeList.get(0).setName("Aaron Smith");

        Costs costs = costService.calculateCosts(employeeList);

        assertThat(costs.getAnnualTotalEmployeeSalaryCost(), equalTo(52000));
        assertThat(costs.getAnnualRemainingEmployeeSalary(), equalTo(51100));
        assertThat(costs.getAnnualTotalEmployeeDeductions(), equalTo(900));
    }

    @Test
    public void calculateCostsWorksForASingleEmployeeWithASingleDependent() {
        List<Employee> employeeList = defineSimpleEmployeeList();

        Costs costs = costService.calculateCosts(employeeList);

        assertThat(costs.getAnnualTotalEmployeeSalaryCost(), equalTo(52000));
        assertThat(costs.getAnnualRemainingEmployeeSalary(), equalTo(50500));
        assertThat(costs.getAnnualTotalEmployeeDeductions(), equalTo(1500));
    }

    @Test
    public void calculateCostsWorksForMultipleEmployeesAndDependentsSomeOfWhichHaveNamesStartingWIthA() {
        List<Employee> employeeList = defineAdvancedEmployeeList();

        Costs costs = costService.calculateCosts(employeeList);

        assertThat(costs.getAnnualTotalEmployeeSalaryCost(), equalTo(156000));
        assertThat(costs.getAnnualRemainingEmployeeSalary(), equalTo(151200));
        assertThat(costs.getAnnualTotalEmployeeDeductions(), equalTo(4800));
    }

    //TODO uncomment this test to demonstrate decorator functionality of adding a new decorator
    @Test
//    public void calculateCostsWorksForASingleEmployeeWhoseNameStartsWithAAndIsLongerThan10CharactersWithNoDependents() {
//        List<Employee> employeeList = defineSimpleEmployeeList();
//        employeeList.get(0).setDependents(new ArrayList<>());
//        employeeList.get(0).setName("Aaron Smith");
//
//        Costs costs = costService.calculateCosts(employeeList);
//
//        assertThat(costs.getAnnualTotalEmployeeSalaryCost(), equalTo(52000));
//        assertThat(costs.getAnnualRemainingEmployeeSalary(), equalTo(51550));
//        assertThat(costs.getAnnualTotalEmployeeDeductions(), equalTo(450));
//    }

    private List<Employee> defineSimpleEmployeeList() {
        List<Employee> employeeList = new ArrayList<>();

        //$1000 deduction
        Employee bob = new Employee("Bob Smith", 1);

        //$500 deduction
        Dependent dependent = new Dependent("Terry Smith", 1);
        bob.getDependents().add(dependent);

        employeeList.add(bob);
        return employeeList;
    }

    private List<Employee> defineAdvancedEmployeeList() {
        List<Employee> employeeList = new ArrayList<>();

        //$1000 + 450 + 500 = 1950 deduction for bob
        Employee bob = new Employee("Bob Smith", 1);
        Dependent terry = new Dependent("Terry Smith", 1);
        Dependent aaron = new Dependent("Aaron Smith", 2);
        bob.getDependents().addAll(Arrays.asList(terry, aaron));

        //$1000 deduction for sarah
        Employee sarah = new Employee("Sarah Vaughn", 1);

        //$900 + 450 + 500 = $1850 for amber
        Employee amber = new Employee("Amber Wright", 3);
        Dependent angela = new Dependent("Angela Wright", 1);
        Dependent mark = new Dependent("Mark WRight", 2);
        amber.getDependents().addAll(Arrays.asList(angela, mark));

        employeeList.add(bob);
        employeeList.add(sarah);
        employeeList.add(amber);

        //total deductions = $1950 + $1000 + $1850 = $4800
        return employeeList;
    }
}