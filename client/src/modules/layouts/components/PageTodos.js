import React, { Component } from 'react';
import TodosRest from '../../../modules/todos/TodosRest'
import logo from '../../../assets/images/logo.svg';
import '../../../assets/css/App.css';

/**
 * Main Application
 * @type {[type]}
 */
class PageTodos extends Component {

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        return (
            <div>
                <div className="App App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>My React TODOS example</h2>
                    <p>Calls REST API using axios js</p>
                </div>
                <hr />
                <TodosRest auth_token={this.props.auth_token} />
            </div>
        );
    }
}

export default PageTodos;
