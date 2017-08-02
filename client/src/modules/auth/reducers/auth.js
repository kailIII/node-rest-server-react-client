
import Cookies from 'universal-cookie';

// Init cookie handler
var cookieHandler = new Cookies();

export default(state, action) => {

    if (typeof state === 'undefined') {
        var cookie = cookieHandler.get('nodetodos');
        state = {
            username: cookie ? cookie.username : '',
            auth_token: cookie ? cookie.auth_token : ''
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
                auth_token: action.auth_token
            };

        case 'LOGOUT':
            cookieHandler.set('nodetodos', {}, { path: '/' });
            return {
                username: '',
                auth_token: ''
            }

        default:
            return state;
    }
};
