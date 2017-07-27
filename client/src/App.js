import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Auth from './modules/auth/Auth'
import Todos from './modules/todos/Todos'
import logo from './assets/images/logo.svg';
import './assets/css/App.css';

const cookies = new Cookies();

class App extends Component {

    constructor(props) {
        super(props);

        // Initial data
        var webcookie = cookies.get('nodetodos');
        this.state = {
            username: webcookie.username ? webcookie.username : '',
            auth_token: webcookie.auth_token ? webcookie.auth_token : ''
        }

        // Component methods
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(username, auth_token) {
        cookies.set('nodetodos', {username, auth_token}, { path: '/' });
        this.setState({
            username: username,
            auth_token: auth_token
        });
    }

    logout() {
        cookies.set('nodetodos', {}, { path: '/' });
        this.setState({
            username: '',
            auth_token: ''
        });
    }

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
                <Todos auth_token={this.state.auth_token} />
                <Auth username={this.state.username}
                    login={this.login}
                    logout={this.logout} />
            </div>
        );
    }
}

export default App;
