
import axios from 'axios';

/**
 * Auth model
 *
 * Responsible to comunicate with remote server
 * @type {String}
 */
const AuthModel = {

    /**
     * Dispense a new record
     * @return {object} The new record as object
     */
    dispense: () => {
        return {id: '', username: ''};
    },

    /**
     * Login user
     * @param  {Function} cb Async return
     * @return {[type]}      [description]
     */
    login: (user, cb) => {
        axios.post(AuthModel.endpoint + '/login', user)
        .then(res => {
            if (res.status === 200) {
                cb(res.data);
            }
        });
    },

    /**
     * Register user
     * @param  {object}   todo The record to store
     * @param  {Function} cb   Async return
     * @return {[type]}        [description]
     */
    register: (user, cb) => {
        axios.post(AuthModel.endpoint + '/register', user)
        .then(res => {
            if (res.status === 200) {
                cb(res.data);
            }
        });
    }
}

AuthModel.endpoint = 'http://localhost:8888/auth'

export default AuthModel
