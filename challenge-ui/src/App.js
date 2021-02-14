import logo from './logo.svg';

import './App.css';
import Dependent from "./components/Dependent";
import * as React from "react";

const testEmployees = [
    {
        name: "Brian Thomas",
        id: 1,
        dependents: [
            {
                name: "Amy Thomas",
                id: 3
            },
            {
                name: "Jonathan Thomas",
                id: 4
            }
        ]
    },
    {
        name: "Jenny Arturo",
        id: 2,
        dependents: [
            {
                name: "Robert Arturo",
                id: 5
            }
        ]
    }
]


function App() {
    let i = 0;
    const [currentEmployee, setCurrentEmployee] = React.useState(testEmployees[0]);
    const makeCurrentActive = employeeId => {
        console.log(findEmployeeById(employeeId));
        // console.log("making current active" + employeeId);
        // i++;
        //currentEmployee = testEmployees[employeeId];
    }

    const onEmployeeInListClick = (employee) => {
        console.log("Employee button was clicked");
        let newCurrentEmployee = findEmployeeById(employee.id);
        console.log("New current employee: " + newCurrentEmployee.name);
        setCurrentEmployee(newCurrentEmployee);
        // let employeeClicked = findEmployeeById(employee.id);
        // console.log("Employee button clicked", findEmployeeById(employee.id))
        // console.log("a");
        // //setCurrentEmployee(employeeClicked);
        // console.log("b");
        // console.log("Current employee: " + currentEmployee);
    }

    const testFunction = () => {
        console.log("save clicked");
    }


    const findEmployeeById = (id) => {
        return testEmployees.find(x => x.id === id);
    }

    const EmployeeInlist = props => (
        <div>
            {/*<button className="button" onClick={() => props.onClick(props.employee)}*/}
            {/*    // onClick={() => console.log("Employee button clicked", findEmployeeById(props.employee.id))}>*/}
            {/*>*/}
            {/*    Employee Button*/}
            {/*</button>*/}
            <a href="#"
                // onClick={() => console.log("Employee button clicked", findEmployeeById(props.employee.id))}> {props.employee.name}</a>
               onClick={() => props.onClick(props.employee)}
            > {props.employee.name}</a>
        </div>
    )

    return (
        <div className="App">
            <div className="employeeList">
                <div>
                    {testEmployees.map(employee =>
                        <EmployeeInlist onClick={onEmployeeInListClick} key={employee.id} employee={employee}/>
                    )}
                </div>

            </div>

            <div className="employeeDetails">
                <form>
                    <div className="employeeDetail">
                        <div className="entry">
                            <input disabled={true} type="text" placeholder={currentEmployee.name}/>
                        </div>

                        Dependents
                        <div className="dependents">
                            {currentEmployee.dependents.map(dependent =>
                                <Dependent key={dependent.id} name={dependent.name}/>
                            )}
                        </div>
                        <button className="button" onClick={testFunction}>Save</button>

                    </div>
                </form>
            </div>
        </div>
    );


}


export default App;
