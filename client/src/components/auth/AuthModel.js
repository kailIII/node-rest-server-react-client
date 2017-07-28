
import axios from 'axios';

const endpoint = 'http://localhost:8888/auth';

/**
 * Auth model
 *
 * Responsible to comunicate with remote server
 * @type {String}
 */
class AuthModel {

    /**
     * Dispense a new record
     * @return {object} The new record as object
     */
    static dispense() {
        return {id: '', username: ''};
    }

    /**
     * Login user
     * @param  {Function} cb Async return
     * @return {[type]}      [description]
     */
    static login(user, cb) {
        axios.post(endpoint + '/login', user)
        .then(res => {
            if (res.status === 200) {
                cb(res.data);
            }
        });
    }

    /**
     * Register user
     * @param  {object}   todo The record to store
     * @param  {Function} cb   Async return
     * @return {[type]}        [description]
     */
    static register(user, cb) {
        axios.post(endpoint + '/register', user)
        .then(res => {
            if (res.status === 200) {
                cb(res.data);
            }
        });
    }
}

export default AuthModel
