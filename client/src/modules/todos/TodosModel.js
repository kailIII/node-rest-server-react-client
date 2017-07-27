
import axios from 'axios';

const endpoint = 'http://localhost:8888/todos';

/**
 * Todos model
 *
 * Responsible to comunicate with remote server
 * @type {String}
 */
class TodosModel {

    /**
     * Dispense a new record
     * @return {object} The new record as object
     */
    static dispense() {
        return {id: '', text: '', complete: false};
    }

    /**
     * Find all records
     * @param  {Function} cb Async return
     * @return {[type]}      [description]
     */
    static findAll(cb) {
        var options = {
            headers: {
                'X-Authorization': TodosModel.auth_token
            }
        }
        console.log('request options', options);
        axios.get(endpoint, options)
        .then(res => {
            if (res.status === 200) {
                cb(res.data);
            }
        });
    }

    /**
     * Store record
     * @param  {object}   todo The record to store
     * @param  {Function} cb   Async return
     * @return {[type]}        [description]
     */
    static store(todo, cb) {
        var options = {
            headers: {
                'X-Authorization': TodosModel.auth_token
            }
        }
        axios.post(endpoint, todo, options)
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
    static remove(todo, cb) {
        var options = {
            headers: {
                'X-Authorization': TodosModel.auth_token
            }
        }
        axios.delete(endpoint + '/' + todo.id, options)
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
    static clearCompleted(cb) {
        var options = {
            headers: {
                'X-Authorization': TodosModel.auth_token
            }
        }
        axios.get(endpoint + '/clear/completed', options)
        .then(res => {
            if (res.status === 200) {
                cb(res.data);
            }
        });
    }
}

TodosModel.auth_token = '';

export default TodosModel
