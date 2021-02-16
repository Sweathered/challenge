import * as React from "react";
import '../App.css';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.showEditEmployees = this.showEditEmployees.bind(this);
        this.handleCalculateClick = this.handleCalculateClick.bind(this);
    }

    showEditEmployees() {
        this.props.showEditEmployees();
    }

    handleCalculateClick() {
        this.props.handleCalculateClick();
    }


    render() {
        return (
            <div className="header">
                <button className="largeButton" type="submit" onClick={this.showEditEmployees}>
                    Edit Employees
                </button>
                <button className="largeButton" type="submit" onClick={this.handleCalculateClick}>
                    Calculate Costs
                </button>
            </div>
        )
    }
}

export default Header;