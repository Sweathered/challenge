package com.challenge.service;

import com.challenge.models.Employee;
import com.challenge.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

@Service
public class EmployeeService {
    private List<Employee> employees;

    @Autowired
    private EmployeeRepository employeeRepository;

//    public EmployeeService() {
//        this.employees = (List<Employee>) employeeRepository.findAll();
//    }

    @PostConstruct
    public void setup(){
        this.employees = (List<Employee>) employeeRepository.findAll();
    }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void saveEmployees(List<Employee> employees) {
        this.employees = employees;
        employeeRepository.saveAll(employees);
    }
}
