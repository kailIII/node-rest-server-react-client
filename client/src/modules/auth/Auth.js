import React, { Component } from 'react';
import AuthComponent from './components/Auth'
import * as authActions from './actions/auth';
import { connect } from 'react-redux';

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
    login(refs) {
        const params = {
            username: refs.loginUsername.value,
            password:refs.loginPassword.value
        }
        this.props.login(params)
    }

    /**
     * Register user
     * @return {[type]} [description]
     */
    register(refs) {
        const params = {
            username: refs.registerUsername.value,
            password: refs.registerPassword.value
        }
        this.props.register(params);
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
                registerResult={this.props.registerResult}
            />
        )
    }
}

function mapStateToProps(state, props) {
    return state.auth
}

function mapDispatchToProps(dispatch) {
    return {
        login: (username, auth_token) => {
            dispatch(authActions.loginAsync(username, auth_token))
        },
        logout: () => {
            dispatch(authActions.logout())
        },
        register: (user) => {
            dispatch(authActions.registerStart())
            dispatch(authActions.registerAsync(user))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
