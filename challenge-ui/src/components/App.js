import Dependent from "./Dependent";
import * as React from "react";
import testData from "../testData";
import '../App.css';
import Sidebar from "./Sidebar";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: testData,
            currentEmployeeIndex: 0
        }

        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleCurrentEmployeeNameChange = this.handleCurrentEmployeeNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddEmployeeClick = this.handleAddEmployeeClick.bind(this);
        this.handleEmployeeInSidebarClick = this.handleEmployeeInSidebarClick.bind(this);
        this.handleAddDependentClick = this.handleAddDependentClick.bind(this);
        this.handleDeleteDependentClick = this.handleDeleteDependentClick.bind(this);
        this.handleDeleteEmployeeClick = this.handleDeleteEmployeeClick.bind(this);
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
        alert("calculate clicked");
    }

    handleSaveClick() {
        alert("save clicked");
    }


    render() {
        return (
            <div className="Wrapper">
                <Sidebar employees={this.state.employees}
                         handleAddEmployeeClick={this.handleAddEmployeeClick}
                         handleEmployeeInSidebarClick={this.handleEmployeeInSidebarClick}
                         handleSaveClick={this.handleSaveClick}
                         handleCalculateClick={this.handleCalculateClick}
                />

                <div className="employeeDetails">

                    <div className="employeeDetail">
                        <div className="entry">
                            <input type="text" value={this.state.employees[this.state.currentEmployeeIndex].name}
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
        )
    }
}

export default App;