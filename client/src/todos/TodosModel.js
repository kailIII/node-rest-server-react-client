
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
        axios.get(endpoint)
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
        axios.post(endpoint, todo)
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
        axios.delete(endpoint + '/' + todo.id)
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
        axios.get(endpoint + '/clear/completed')
        .then(res => {
            if (res.status === 200) {
                cb(res.data);
            }
        });
    }
}

export default TodosModel
