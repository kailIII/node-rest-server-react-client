import React, { Component } from 'react';
import AuthModel from './AuthModel'

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

        // Component methods
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    /**
     * Login user
     * @return {[type]} [description]
     */
    login() {
        var user = {
            username: this.refs.loginUsername.value,
            password: this.refs.loginPassword.value
        }
        AuthModel.login(user, (result) => {
            if (result.auth_token) {
                this.props.login(user.username, result.auth_token);
            }
        });
    }

    /**
     * Register user
     * @return {[type]} [description]
     */
    register() {
        var user = {
            username: this.refs.registerUsername.value,
            password: this.refs.registerPassword.value
        }
        AuthModel.register(user, (auth_token) => {
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
        if (!this.props.username) {
            return (
                <div className="auth">
                    <h4>Login</h4>
                    <form onSubmit={(e) => {e.preventDefault(); this.login();}}>
                        <label>Username</label>
                        <input type="text" ref="loginUsername" /><br />
                        <label>Password</label>
                        <input type="password" ref="loginPassword" /><br />
                        <button type="submit">Login</button>
                    </form>
                    <hr />
                    <h4>Register</h4>
                    <form onSubmit={(e) => {e.preventDefault(); this.register();}}>
                        <label>Username</label>
                        <input type="text" ref="registerUsername" /><br />
                        <label>Password</label>
                        <input type="password" ref="registerPassword" /><br />
                        <button type="submit">Register</button>
                    </form>
                </div>
            )
        } else {
            return (
                <div className="auth">
                    <h4>Welcome {this.props.username}</h4>
                    <button onClick={this.props.logout}>logout</button>
                </div>
            )
        }
    }
}

export default Auth;
