import React, { Component } from 'react';
import Auth from '../../../modules/auth/Auth'

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
            <Auth username={this.props.username}
                login={this.props.login}
                logout={this.props.logout}
            />
        );
    }
}

export default PageAuth;
