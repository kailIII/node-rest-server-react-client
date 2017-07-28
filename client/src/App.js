import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from './Header'
import PageTodos from './PageTodos'
import PageAuth from './PageAuth'

const cookies = new Cookies();

/**
 * Other page example
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
                <Header username={this.state.username}
                    logout={this.logout} />
                <Switch>
                    <Route exact path="/" render={() => (
                        <PageTodos auth_token={this.state.auth_token} />
                    )} />
                    <Route path="/login" render={() => (
                        <PageAuth login={this.login}
                            username={this.state.username} />
                    )} />
                </Switch>
            </div>
        );
    }
}

export default App;
