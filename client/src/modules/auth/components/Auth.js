import React, { Component } from 'react';

/**
 * Auth component
 * @type {Object}
 */
class Auth extends Component {

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        if (!this.props.username) {
            return (
                <div className="auth">
                    <h4>Login</h4>
                    <form onSubmit={(e) => {e.preventDefault(); this.props.login.call(null, this.refs);}}>
                        <label>Username</label>
                        <input type="text" ref="loginUsername" /><br />
                        <label>Password</label>
                        <input type="password" ref="loginPassword" /><br />
                        <button type="submit">Login</button>
                    </form>
                    <hr />
                    <h4>Register</h4>
                    <form onSubmit={(e) => {e.preventDefault(); this.props.register.call(null, this.refs);}}>
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
