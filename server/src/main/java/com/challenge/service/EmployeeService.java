package com.challenge.service;

import com.challenge.models.Dependent;
import com.challenge.models.Employee;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {

    public List<Employee> getEmployees() {
        List<Employee> employees = new ArrayList<>();
        Employee employee = new Employee();
        employee.setName("Scott Weathered");
        employee.setId(1);
        employee.setDependents(defineDependents());
        employees.add(employee);
        return employees;
    }

    private List<Dependent> defineDependents() {
        List<Dependent> dependents = new ArrayList<>();
        Dependent dependent = new Dependent();
        dependent.setName("Scott's Dependent");
        dependents.add(dependent);
        return dependents;
    }
}
