
import axios from 'axios';

/**
 * Auth model
 *
 * Responsible to comunicate with remote server
 * @type {String}
 */
class AuthModel {

    constructor() {
        this.endpoint = 'http://localhost:8888/auth';
    }

    /**
     * Dispense a new record
     * @return {object} The new record as object
     */
    dispense() {
        return {id: '', username: ''};
    }

    /**
     * Login user
     * @param  {Function} cb Async return
     * @return {[type]}      [description]
     */
    login(user, cb) {
        axios.post(this.endpoint + '/login', user)
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
    register(user, cb) {
        axios.post(this.endpoint + '/register', user)
        .then(res => {
            if (res.status === 200) {
                cb(res.data);
            }
        });
    }
}

export default AuthModel
