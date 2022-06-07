import logo from './logo.svg';
import './App.css';
//functional component
function App() {//Every React application has at least one component: the root component, named App in App.js.
    //The App component controls the view through the JSX template
    return (//note we use className instead of class attribute because class is a reserved word in JS
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
