import React, { Component } from 'react';
import Todos from './todos/Todos'
import logo from './logo.svg';
import './App.css';

class App extends Component {

    // Render todo app
    render() {
        return (
            <div>
                <div className="App App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>My React TODOS example</h2>
                    <p>Calls REST API using axios js</p>
                </div>
                <hr />
                <Todos/>
            </div>
        );
    }
}

export default App;
