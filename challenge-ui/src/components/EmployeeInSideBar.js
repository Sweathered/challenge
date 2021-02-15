import * as React from "react";
import testData from "../testData";

class EmployeeInSideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <a href="#"
                   onClick={() => this.props.onClick(this.props.employee)}
                > {this.props.employee.name}</a>
            </div>
        )
    }
}

export default EmployeeInSideBar;