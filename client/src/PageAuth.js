import React, { Component } from 'react';
import Auth from './components/auth/Auth'

/**
 * Other page example
 * @type {[type]}
 */
class PageAuth extends Component {

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        return (
            <div>
                <h1>Login</h1>
                <Auth username={this.props.username}
                    login={this.props.login}
                    logout={this.props.logout} />
            </div>
        );
    }
}

export default PageAuth;
