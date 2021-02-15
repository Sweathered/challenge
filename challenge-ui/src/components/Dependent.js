import * as React from "react";

class Dependent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        return (
            <div className="entry">
                {/*<input disabled={true} type="text" placeholder={props.name}/>*/}
                <input type="text"
                       value={this.props.name}
                       onChange={this.handleChange}/>
            </div>
        );
    }
}

export default Dependent;