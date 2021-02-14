function Dependent(props) {
    return (
        <div className="entry">
            <input disabled={true} type="text" placeholder={props.name}/>
        </div>);
}

export default Dependent;