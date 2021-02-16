package com.challenge.service;

import com.challenge.models.Dependent;
import com.challenge.models.Employee;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {
    private List<Employee> employees = defineSampleEmployees();

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


}
