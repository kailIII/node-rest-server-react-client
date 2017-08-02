
import axios from 'axios';

/**
 * Todos model
 *
 * Responsible to comunicate with remote server
 * @type {String}
 */
const TodosModel = {

    /**
     * Get HTTP options
     * @return {object}
     */
    getOptions: () => {
        return {
            headers: {
                'X-Authorization': TodosModel.auth_token
            }
        }
    },

    /**
     * Dispense a new record
     * @return {object} The new record as object
     */
    dispense: () => {
        return {id: '', text: '', status: 'active'};
    },

    /**
     * Find all records
     * @param  {Function} cb Async return
     * @return {[type]}      [description]
     */
    findAll: (cb) => {
        return axios.get(TodosModel.endpoint, TodosModel.getOptions())
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
    },

    /**
     * Store record
     * @param  {object}   todo The record to store
     * @param  {Function} cb   Async return
     * @return {[type]}        [description]
     */
    store: (todo, cb) => {
        axios.post(TodosModel.endpoint, todo, TodosModel.getOptions())
        .then(res => {
            if (res.status === 200) {
                cb(res.data);
            }
        });
    },

    /**
     * Remove record
     * @param  {object}   todo The record to be removed
     * @param  {Function} cb   Async return
     * @return {[type]}        [description]
     */
    remove: (todo, cb) => {
        axios.delete(TodosModel.endpoint + '/' + todo.id, TodosModel.getOptions())
        .then(res => {
            if (res.status === 200) {
                cb();
            }
        });
    },

    /**
     * Clear all completed records
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     */
    clearCompleted: (cb) => {
        axios.get(TodosModel.endpoint + '/clear/completed', TodosModel.getOptions())
        .then(res => {
            if (res.status === 200) {
                cb(res.data);
            }
        });
    },

    /**
     * Generate new id
     * @return {number} The new id
     */
    generateId: () => {
        return Math.floor(Math.random() * 1000000) + 1
    }
}

TodosModel.endpoint = 'http://localhost:8888/todos';
TodosModel.auth_token = '';

export default TodosModel
