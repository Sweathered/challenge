import * as React from "react";
import '../App.css';
import EmployeeInSideBar from "./EmployeeInSideBar";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.handleEmployeeInSidebarClick = this.handleEmployeeInSidebarClick.bind(this);
        this.handleAddEmployeeClick = this.handleAddEmployeeClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    handleEmployeeInSidebarClick(props) {
        this.props.handleEmployeeInSidebarClick(props.id)
    }

    handleAddEmployeeClick() {
        this.props.handleAddEmployeeClick()
    }

    handleSaveClick() {
        this.props.handleSaveClick()
    }

    render() {
        return (
            <div className="employeeList">
                <div>
                    {this.props.employees.map(employee =>
                        <EmployeeInSideBar onClick={this.handleEmployeeInSidebarClick}
                                           key={employee.id}
                                           employee={employee}/>
                    )}
                </div>
                <button className="largeButton" onClick={this.handleAddEmployeeClick}>
                    Add Employee
                </button>

                <button className="largeButton" type="submit" onClick={this.handleSaveClick}>
                    Save Employees
                </button>

            </div>
        );
    }
}

export default Sidebar;