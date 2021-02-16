import Dependent from "./Dependent";
import * as React from "react";
import '../App.css';
import Sidebar from "./Sidebar";
import Header from "./Header";
import NumberFormat from 'react-number-format'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            currentEmployeeIndex: 0,
            isLoading: true,
            showEditEmployees: true,
            costs: {
                annualTotalEmployeeSalaryCost: 0,
                annualTotalEmployeeDeductions: 0,
                annualRemainingEmployeeSalary: 0,
                costsPerEmployee: []
            }
        }

        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleCurrentEmployeeNameChange = this.handleCurrentEmployeeNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddEmployeeClick = this.handleAddEmployeeClick.bind(this);
        this.handleEmployeeInSidebarClick = this.handleEmployeeInSidebarClick.bind(this);
        this.handleAddDependentClick = this.handleAddDependentClick.bind(this);
        this.handleDeleteDependentClick = this.handleDeleteDependentClick.bind(this);
        this.handleDeleteEmployeeClick = this.handleDeleteEmployeeClick.bind(this);
        this.handleCalculateClick = this.handleCalculateClick.bind(this);
        this.showEditEmployees = this.showEditEmployees.bind(this);
    }

    showEditEmployees() {
        this.setState({
            showEditEmployees: true
        })
    }

    componentDidMount() {
        let employeeDataFromAPI = [];

        fetch('http://localhost:8080/employees')
            .then(response => response.json())
            .then((data) => {
                employeeDataFromAPI = data;
                this.setState({
                    employees: employeeDataFromAPI,
                    isLoading: false
                })
            })
            .catch(console.log)
    }

    findEmployeeById(id) {
        console.log("id : " + id);
        return this.state.employees.find(id);
    }

    findEmployeeIndex = (id) => {
        return this.state.employees.findIndex(x => x.id === id);
    }

    handleCurrentEmployeeNameChange = event => {
        const employees = [...this.state.employees];
        const employee = this.state.employees[this.state.currentEmployeeIndex];
        const index = employees.indexOf(employee)
        employee.name = event.target.value;
        employees[index] = employee;
        this.setState({employees})
    }

    handleSubmit(event) {
        alert('An employee update was submitted' + this.state.currentEmployeeIndex);
        event.preventDefault()
    }

    getHighestId(entities) {
        let highestId = -1;
        for (const entity of entities) {
            if (entity.id > highestId) {
                highestId = entity.id
            }
        }
        return highestId;
    }

    //Dependent functions
    handleDependentChange = (updatedName, dependentId) => {
        const updatedEmployees = this.state.employees;

        //find employee and dependent to update
        let employeeToUpdate = updatedEmployees[this.state.currentEmployeeIndex];
        let dependentBeingUpdated = employeeToUpdate.dependents.find(x => x.id === dependentId);
        let dependentIndex = employeeToUpdate.dependents.indexOf(dependentBeingUpdated);

        //update dependent and employees
        dependentBeingUpdated.name = updatedName;
        employeeToUpdate.dependents[dependentIndex] = dependentBeingUpdated;
        updatedEmployees[this.state.currentEmployeeIndex] = employeeToUpdate;

        this.setState(state => ({
            employees: updatedEmployees
        }));
    }

    handleAddDependentClick = () => {
        const updatedEmployees = this.state.employees;

        //get employee to update
        let employeeToUpdate = updatedEmployees[this.state.currentEmployeeIndex];

        let newId = this.getHighestId(employeeToUpdate.dependents) + 1;

        employeeToUpdate.dependents = [...employeeToUpdate.dependents,
            {
                name: "New Dependent",
                id: newId,
                dependents: []
            }
        ]

        //update employee
        updatedEmployees[this.state.currentEmployeeIndex] = employeeToUpdate;

        this.setState(state => ({
            employees: updatedEmployees
        }));
    }

    handleDeleteDependentClick(dependentIdToDelete) {
        let updatedEmployees = this.state.employees;

        let employeeToUpdate = updatedEmployees[this.state.currentEmployeeIndex];

        employeeToUpdate.dependents = employeeToUpdate.dependents.filter(dependent => dependent.id !== dependentIdToDelete);

        updatedEmployees[this.state.currentEmployeeIndex] = employeeToUpdate;

        this.setState(state => ({
            employees: updatedEmployees
        }));
    }

    handleDeleteEmployeeClick() {
        let updatedEmployees = this.state.employees;

        if (updatedEmployees.length > 1) {
            const currentEmployeeId = updatedEmployees[this.state.currentEmployeeIndex].id

            updatedEmployees = updatedEmployees.filter(employee => employee.id !== currentEmployeeId)

            this.setState(state => ({
                employees: updatedEmployees,
                currentEmployeeIndex: 0
            }));
        } else {
            alert("Cannot delete last employee");
        }
    }

    //Sidebar functions
    handleEmployeeInSidebarClick(id) {
        const currentEmployeeIndex = this.findEmployeeIndex(id);

        console.log("EmployeeInSidebar clicked" + currentEmployeeIndex);

        this.setState(state => ({
            currentEmployeeIndex: currentEmployeeIndex
        }));
    }

    handleAddEmployeeClick() {
        const employees = this.state.employees;
        const newEmployeeIndex = employees.length;

        let newId = this.getHighestId(employees) + 1;

        this.setState(state => ({
            currentEmployeeIndex: newEmployeeIndex,
            employees: [...state.employees,
                {
                    name: "New Employee",
                    id: newId,
                    dependents: []
                }
            ]
        }));
    }

    handleCalculateClick() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            },
            body: JSON.stringify(this.state.employees)
        }
        fetch('http://localhost:8080/costs', requestOptions)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    costs: data,
                    showEditEmployees: false
                })
            })
            .catch(console.log)
    }

    handleSaveClick() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': true
            },
            body: JSON.stringify(this.state.employees)
        }
        fetch('http://localhost:8080/employees', requestOptions)
            .then(response => {
                if (response.status === 200) {
                    alert("Employees saved!")
                } else {
                    alert("Employee save failed :(")
                }
            })
            .catch(console.log)
    }


    render() {
        if (this.state.isLoading) {
            return <div>Loading... Please Wait</div>
        }

        if (this.state.showEditEmployees) {
            return (
                <div className="outerWrapper">
                    <Header
                        showEditEmployees={this.showEditEmployees}
                        handleCalculateClick={this.handleCalculateClick}
                    />
                    <div className="innerWrapper">
                        <Sidebar className="sidebar"
                                 employees={this.state.employees}
                                 handleAddEmployeeClick={this.handleAddEmployeeClick}
                                 handleEmployeeInSidebarClick={this.handleEmployeeInSidebarClick}
                                 handleSaveClick={this.handleSaveClick}
                                 handleCalculateClick={this.handleCalculateClick}
                        />

                        {/*<div className="employeeDetails">*/}
                        <div className="employeeDetails">
                            <div className="employeeDetail">
                                Employee

                                <div className="entry">
                                    <input type="text"
                                           value={this.state.employees[this.state.currentEmployeeIndex].name}
                                           onChange={this.handleCurrentEmployeeNameChange}/>
                                    <button className="button"
                                            onClick={this.handleDeleteEmployeeClick}>
                                        delete
                                    </button>
                                </div>

                                Dependents
                                <div className="dependents">
                                    {this.state.employees[this.state.currentEmployeeIndex].dependents.map(dependent =>
                                        <Dependent key={dependent.id}
                                                   name={dependent.name}
                                                   id={dependent.id}
                                                   onChange={this.handleDependentChange}
                                                   onDelete={this.handleDeleteDependentClick}
                                        />
                                    )}
                                </div>
                                <button className="largeButton" type="submit"
                                        onClick={this.handleAddDependentClick}>Add Dependent
                                </button>
                            </div>

                        </div>
                    </div>


                </div>
            )

        } else {
            return (
                <>
                    <Header
                        showEditEmployees={this.showEditEmployees}
                        handleCalculateClick={this.handleCalculateClick}
                    />

                    <div className="costSummaryWrapper">
                        <div className="summaryText">
                            Annual Total Employee Salary Cost:
                            <NumberFormat value={this.state.costs.annualTotalEmployeeSalaryCost} displayType={'text'}
                                          thousandSeparator={true} prefix={'$'}>
                            </NumberFormat>
                        </div>
                        <div className="summaryText">
                            Annual Total Employee Deductions:
                            <NumberFormat value={this.state.costs.annualTotalEmployeeDeductions} displayType={'text'}
                                          thousandSeparator={true} prefix={'$'}>
                            </NumberFormat>

                        </div>
                        <div className="summaryText">
                            Annual Remaining Employee Salary:
                            <NumberFormat value={this.state.costs.annualRemainingEmployeeSalary} displayType={'text'}
                                          thousandSeparator={true} prefix={'$'}>
                            </NumberFormat>
                        </div>

                        <div>
                            Deductions Per Employee

                            {this.state.costs.costsPerEmployee.map(employee =>
                                <div>
                                    Annual Total Employee Deductions for {employee.name}:
                                    <NumberFormat value={employee.annualTotalEmployeeDeductions}
                                                  displayType={'text'}
                                                  thousandSeparator={true} prefix={'$'}>
                                    </NumberFormat>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )
        }


    }
}

export default App;