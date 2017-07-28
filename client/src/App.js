import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Auth from './components/auth/Auth'
import TodosRest from './components/todos/TodosRest'
import logo from './assets/images/logo.svg';
import './assets/css/App.css';

const cookies = new Cookies();

/**
 * Main Application
 * @type {[type]}
 */
class App extends Component {

    /**
     * Init application component
     * @param  {Object} props [description]
     * @return {[type]}       [description]
     */
    constructor(props) {
        super(props);

        // Initial data
        var webcookie = cookies.get('nodetodos');
        this.state = {
            username: webcookie ? webcookie.username : '',
            auth_token: webcookie ? webcookie.auth_token : ''
        }

        // Component methods
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    /**
     * Login user into application
     * @param  {String} username   [description]
     * @param  {String} auth_token [description]
     * @return {[type]}            [description]
     */
    login(username, auth_token) {
        var expires = 86400000; // 24 hours
        var d = new Date();
        d.setTime(d.getTime() + expires);
        cookies.set('nodetodos', {username, auth_token}, { path: '/', expires: d });
        this.setState({
            username: username,
            auth_token: auth_token
        });
    }

    /**
     * Logout user
     * @return {[type]} [description]
     */
    logout() {
        cookies.set('nodetodos', {}, { path: '/' });
        this.setState({
            username: '',
            auth_token: ''
        });
    }

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
                <TodosRest auth_token={this.state.auth_token} />
                <Auth username={this.state.username}
                    login={this.login}
                    logout={this.logout} />
            </div>
        );
    }
}

export default App;
