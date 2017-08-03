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

        // Register notification
        function RegisterNotify(props) {
            if (props.result && props.result.completed) {
                if (props.result.id) return (<p>Register ok</p>)
                else return (<p>Register failed</p>)
            }
            return null
        }

        // Render login or logout
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
                        <RegisterNotify result={this.props.registerResult} />
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
