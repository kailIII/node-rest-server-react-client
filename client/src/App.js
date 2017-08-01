import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import AppComponent from './modules/layouts/components/App';

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

        // Dependencies
        this.cookieHandler = new Cookies();

        // Initial data
        var cookie = this.cookieHandler.get('nodetodos');
        this.state = {
            username: cookie ? cookie.username : '',
            auth_token: cookie ? cookie.auth_token : ''
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
        this.cookieHandler.set('nodetodos', {username, auth_token}, { path: '/', expires: d });
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
        this.cookieHandler.set('nodetodos', {}, { path: '/' });
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
            <AppComponent
                username={this.state.username}
                auth_token={this.state.auth_token}
                login={this.login}
                logout={this.logout}
            />
        );
    }
}

export default App;
