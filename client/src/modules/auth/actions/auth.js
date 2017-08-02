export const login = (username, auth_token) => {
    console.log('login:', username, auth_token);
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
