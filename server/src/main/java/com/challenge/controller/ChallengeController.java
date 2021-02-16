package com.challenge.controller;

import com.challenge.models.costs.Costs;
import com.challenge.models.Employee;
import com.challenge.service.CostService;
import com.challenge.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class ChallengeController {

    public EmployeeService employeeService;
    private CostService costService;

    @GetMapping("/employees")
    public List<Employee> getEmployees() {
        return employeeService.getEmployees();
    }

    @PostMapping("/employees")
    public void getEmployees(@RequestBody List<Employee> employees) {
        employeeService.saveEmployees(employees);
    }

    @PostMapping("/costs")
    public Costs getCosts(@RequestBody List<Employee> employees) {
        return costService.calculateCosts(employees);
    }
}
