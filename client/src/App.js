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
                    <h2>Welcome to React</h2>
                </div>
                <hr />
                <Todos/>
            </div>
        );
    }
}

export default App;
