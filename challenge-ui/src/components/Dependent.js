import * as React from "react";

class Dependent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(e) {
        this.props.onChange(e.target.value, this.props.id);
    }

    handleDelete(e) {
        this.props.onDelete(this.props.id);
    }

    render() {
        return (
            <div className="entry">
                <input type="text"
                       value={this.props.name}
                       onChange={this.handleChange}/>
                <button className="button"
                        value={this.props.name}
                        onClick={this.handleDelete}>
                    delete
                </button>
            </div>
        );
    }
}

export default Dependent;