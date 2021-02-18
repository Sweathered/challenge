package com.challenge.service;

import com.challenge.models.Dependent;
import com.challenge.models.Employee;
import com.challenge.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
public class EmployeeService {
    private List<Employee> employees;

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @PostConstruct
    public void setup() {
        this.employees = (List<Employee>) employeeRepository.findAll();
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void saveEmployees(List<Employee> employees) {
        this.employees = employees;

        for (Employee employee : employees) {
            for (Dependent dependent : employee.getDependents()) {
                dependent.setEmployee(employee);
            }
        }

        employeeRepository.deleteAll();
        employeeRepository.saveAll(employees);
    }
}
