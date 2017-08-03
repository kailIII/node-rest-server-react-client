
import Cookies from 'universal-cookie';

// Init cookie handler
var cookieHandler = new Cookies();

export default(state, action) => {

    if (typeof state === 'undefined') {
        var cookie = cookieHandler.get('nodetodos');
        state = {
            username: cookie ? cookie.username : '',
            auth_token: cookie ? cookie.auth_token : '',
            registerResult: {id: '', completed: false}
        }
    }

    switch (action.type) {

        case 'LOGIN':
            var expires = 86400000; // 24 hours
            var d = new Date();
            d.setTime(d.getTime() + expires);
            cookieHandler.set('nodetodos', {
                username: action.username,
                auth_token: action.auth_token
            }, { path: '/', expires: d });
            return {
                username: action.username,
                auth_token: action.auth_token,
                registerResult: state.registerResult
            };

        case 'LOGOUT':
            cookieHandler.set('nodetodos', {}, { path: '/' });
            return {
                username: '',
                auth_token: '',
                registerResult: state.registerResult
            }

        case 'REGISTER':
            return {
                username: '',
                auth_token: '',
                registerResult: action.result
            }

        case 'REGISTER_START':
            return {
                username: '',
                auth_token: '',
                registerResult: action.result
            }

        default:
            return state;
    }
};
