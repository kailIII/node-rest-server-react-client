import React, { Component } from 'react';
import AppComponent from './components/App';
import { connect } from 'react-redux';
import * as authActions from '../auth/actions/auth';

/**
 * Other page example
 * @type {[type]}
 */
class App extends Component {

    /**
     * Render component
     * @return {[type]} [description]
     */
    render() {
        return (
            <AppComponent
                location={this.props.location}
                username={this.props.username}
                auth_token={this.props.auth_token}
                logout={this.props.logout}
            />
        );
    }
}

function mapStateToProps(state, props) {
    return {
        location: state.routing.locationBeforeTransitions,
        username: state.auth ? state.auth.username : '',
        auth_token: state.auth ? state.auth.auth_token : ''
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => {
            dispatch(authActions.logout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
