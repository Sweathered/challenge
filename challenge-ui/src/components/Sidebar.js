import * as React from "react";
import '../App.css';
import EmployeeInSideBar from "./EmployeeInSideBar";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.handleEmployeeInSidebarClick = this.handleEmployeeInSidebarClick.bind(this);
        this.handleAddEmployeeClick = this.handleAddEmployeeClick.bind(this);
    }

    handleEmployeeInSidebarClick(props) {
        const currentEmployeeIndex = this.findEmployeeIndex(props.id);

        console.log("EmployeeInSidebar clicked" + currentEmployeeIndex);

        this.setState(state => ({
            currentEmployeeIndex: currentEmployeeIndex
        }));
    }

    handleAddEmployeeClick() {
        console.log("handle Employee clicked");
        const employees = this.state.employees;
        const newEmployeeIndex = employees.length;

        console.log("New Employee index: " + newEmployeeIndex);

        let newId = this.getHighestId() + 1;

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

    render() {
        return (
            <div className="employeeList">
                <div>
                    {this.state.employees.map(employee =>
                        <EmployeeInSideBar onClick={this.handleEmployeeInSidebarClick}
                                           key={employee.id}
                                           employee={employee}/>
                    )}
                </div>
                <button className="largeButton" onClick={this.handleAddEmployeeClick}>
                    Add Employee
                </button>

            </div>
        );
    }
}

export default Sidebar;