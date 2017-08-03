import AuthModel from '../AuthModel'

export const login = (username, auth_token) => {
    return {
        type: 'LOGIN',
        username,
        auth_token
    };
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
}

export const register = (result) => {
    return {
        type: 'REGISTER',
        result
    };
}

export const registerStart = () => {
    return {
        type: 'REGISTER_START',
        result: {completed: false}
    };
}

export const loginAsync = (params) => {
    return (dispatch) => {
        AuthModel.login(params, (result) => {
            if (result.auth_token) {
                dispatch(login(params.username, result.auth_token))
            }
        });
    }
}

export const registerAsync = (user) => {
    return (dispatch) => {
        AuthModel.register(user, (result) => {
            result['completed'] = true
            dispatch(register(result))
        });
    }
}
