import Dependent from "./Dependent";
import * as React from "react";
import testData from "../testData";
import EmployeeInSideBar from "./EmployeeInSideBar"
import '../App.css';
import testData2 from "../testData2";

class App extends React.Component {
//[currentEmployee, setCurrentEmployee] = React.useState(testEmployees[0]);

    constructor(props) {
        super(props);
        this.state = {
            employees: testData,
            currentEmployeeIndex: 0
        }

        this.handleEmployeeInSidebarClick = this.handleEmployeeInSidebarClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddEmployeeClick = this.handleAddEmployeeClick.bind(this);
    }

    // onEmployeeInSideBarClick = (employee) => {
    //     console.log("Employee button was clicked");
    //     let newCurrentEmployee = findEmployeeById(employee.id);
    //     console.log("New current employee: " + newCurrentEmployee.name);
    //     setCurrentEmployee(newCurrentEmployee);
    // }

    findEmployeeById = (id) => {
        return this.state.employees.find(x => x.id === id);
    }

    findEmployeeIndex = (id) => {
        return this.state.employees.findIndex(x => x.id === id);
    }

    handleEmployeeInSidebarClick(props) {
        const currentEmployeeIndex = this.findEmployeeIndex(props.id);

        this.setState(state => ({
            currentEmployeeIndex: currentEmployeeIndex
        }));
    }

    handleSaveClick() {
        console.log("save clicked");
    }

    handleChange(event) {
        // this.setState({currentEmployeeIndex: event.target.value})
        this.setState({employees[currentEmployeeIndex].name : event.target.value})
    }


    handleDependentChange() {
        console.log("Dependent updated: ");
        //this.setState({currentEmployeeDependents: event.target.value})
    }

    handleSubmit(event) {
        alert('An employee update was submitted' + this.state.currentEmployeeIndex);
        event.preventDefault()
    }

    getHighestId() {
        let highestId = -1;
        for (const employee of this.state.employees) {
            if (employee.id > highestId) {
                highestId = employee.id
            }
        }
        return highestId;
    }


    handleAddEmployeeClick() {
        console.log("handle Employee clicked");

        let newId = this.getHighestId() + 1;

        this.setState(state => ({
            employees: [...state.employees,
                {
                    name: "New Employee",
                    id: newId,
                    dependents: []
                }
            ]
        }));
    }

    // handleClick() {    this.setState(state => ({      isToggleOn: !state.isToggleOn    }));  }

    render() {
        return (
            <div className="Wrapper">
                <div className="employeeList">
                    <div>
                        {this.state.employees.map(employee =>
                            <EmployeeInSideBar onClick={this.handleEmployeeInSidebarClick}
                                               key={employee.id}
                                               employee={employee}/>
                        )}
                    </div>

                </div>


                <button className="button" onClick={this.handleAddEmployeeClick}>
                    Add Employee
                </button>

                <div className="employeeDetails">
                    <form onSubmit={this.handleSubmit}>
                        <div className="employeeDetail">
                            <div className="entry">
                                <input type="text" value={this.state.employees[this.state.currentEmployeeIndex].name}
                                       onChange={this.handleChange}/>
                            </div>

                            Dependents
                            <div className="dependents">
                                {this.state.employees[this.state.currentEmployeeIndex].dependents.map(dependent =>
                                    <Dependent key={dependent.id} name={dependent.name}
                                               onChange={this.handleDependentChange}/>
                                )}
                            </div>

                            {/*<button className="button" onClick={this.handleSaveClick}>Save</button>*/}
                            <input className="button" type="submit" value="Save"/>
                            {/*className="button" onClick={this.handleSaveClick}>Save</input>*/}

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default App;


// EmployeeInSideBar = props => (
//
// <div>
//     // <a href="#"

//            onClick={() => props.onClick(props.employee)}
//         > {props.employee.name}</a>
//     </div>
// )