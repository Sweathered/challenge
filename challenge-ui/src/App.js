import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <div className="employeeList">
                <div>Brian Thomas</div>
                <div>Jenny Arturo</div>
            </div>
            <div className="employeeDetails">
                <div className="employeeDetail">
                    <div className="entry">
                        Brian Thomas
                    </div>
                    <div className="dependents">
                        Dependents
                        <div className="entry">
                            Amy Thomas
                        </div>
                        <div className="entry">
                            Jonathan Thomas
                        </div>
                    </div>

                </div>
            </div>
            {/*<header className="App-header">*/}
            {/*  Hello world*/}
            {/*</header>*/}
        </div>
    );
}

export default App;
