
import axios from 'axios';

const endpoint = 'http://localhost:8888/todos';

/**
 * Todos model
 *
 * Responsible to comunicate with remote server
 * @type {String}
 */
class TodosModel {

    constructor() {
        this.endpoint = 'http://localhost:8888/todos';
        this.auth_token = '';
    }

    /**
     * Get HTTP options
     * @return {object}
     */
    getOptions() {
        return {
            headers: {
                'X-Authorization': this.auth_token
            }
        }
    }

    /**
     * Dispense a new record
     * @return {object} The new record as object
     */
    dispense() {
        return {id: '', text: '', status: 'active'};
    }

    /**
     * Find all records
     * @param  {Function} cb Async return
     * @return {[type]}      [description]
     */
    findAll(cb) {
        return axios.get(endpoint, this.getOptions())
        .then(res => {
            if (res.status === 200) {
                cb(res.data);
            } else {
                cb([]);
            }
        })
        .catch((error) => {
            cb([]);
        });
    }

    /**
     * Store record
     * @param  {object}   todo The record to store
     * @param  {Function} cb   Async return
     * @return {[type]}        [description]
     */
    store(todo, cb) {
        axios.post(endpoint, todo, this.getOptions())
        .then(res => {
            if (res.status === 200) {
                cb(res.data);
            }
        });
    }

    /**
     * Remove record
     * @param  {object}   todo The record to be removed
     * @param  {Function} cb   Async return
     * @return {[type]}        [description]
     */
    remove(todo, cb) {
        axios.delete(endpoint + '/' + todo.id, this.getOptions())
        .then(res => {
            if (res.status === 200) {
                cb();
            }
        });
    }

    /**
     * Clear all completed records
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     */
    clearCompleted(cb) {
        axios.get(endpoint + '/clear/completed', this.getOptions())
        .then(res => {
            if (res.status === 200) {
                cb(res.data);
            }
        });
    }

    /**
     * Generate new id
     * @return {number} The new id
     */
    generateId() {
        return Math.floor(Math.random() * 1000000) + 1
    }
}

export default TodosModel
