import React, { Component } from 'react';
import AuthModel from './AuthModel'
import AuthComponent from './components/Auth'

/**
 * Auth component
 * @type {Object}
 */
class Auth extends Component {

    /**
     * Initialize component with properties
     * @param  {object} props The properties passed to this component
     * @return {[type]}       [description]
     */
    constructor(props) {
        super(props);

        // Dependencies
        this.model = new AuthModel();

        // Component methods
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    /**
     * Login user
     * @return {[type]} [description]
     */
    login(refs) {
        var user = {
            username: refs.loginUsername.value,
            password: refs.loginPassword.value
        }
        this.model.login(user, (result) => {
            if (result.auth_token) {
                this.props.login(user.username, result.auth_token);
            }
        });
    }

    /**
     * Register user
     * @return {[type]} [description]
     */
    register(refs) {
        var user = {
            username: refs.registerUsername.value,
            password: refs.registerPassword.value
        }
        this.model.register(user, (auth_token) => {
            this.setState({
                username: user.username,
                token: auth_token
            });
        });
    }

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        return (
            <AuthComponent
                username={this.props.username}
                login={this.login}
                register={this.register}
                logout={this.props.logout}
            />
        )
    }
}

export default Auth;
