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
            currentEmployeeIndex: 0,
            currentEmployee: testData[0]
        }

        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleCurrentEmployeeNameChange = this.handleCurrentEmployeeNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    findEmployeeById = (id) => {
        return this.state.employees.find(x => x.id === id);
    }

    findEmployeeIndex = (id) => {
        return this.state.employees.findIndex(x => x.id === id);
    }


    handleSaveClick() {
        console.log("save clicked");
    }

    handleCurrentEmployeeNameChange = event => {
        const employees = [...this.state.employees];
        const employee = this.state.employees[this.state.currentEmployeeIndex];
        const index = employees.indexOf(employee)
        employee.name = event.target.value;
        employees[index] = employee;
        this.setState({employees})
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


    render() {
        return (
            <div className="Wrapper">
                <Sidebar/>

                <div className="employeeDetails">
                    <form onSubmit={this.handleSubmit}>
                        <div className="employeeDetail">
                            <div className="entry">
                                <input type="text" value={this.state.employees[this.state.currentEmployeeIndex].name}
                                       onChange={this.handleCurrentEmployeeNameChange}/>
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