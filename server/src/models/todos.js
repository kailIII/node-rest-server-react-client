const v = require('validator')

/**
 * Todos model
 */
class Todos {

    /**
     * Init Todos model
     */
    constructor(db) {
        this.db = db
    }

    /**
     * Get all records
     * @param  {Function} cb    Async return
     * @return {undefined}      [description]
     */
    findAll(cb) {
        this.db.query('SELECT * FROM todos', (err, res) => {
            if (err) return cb([])
            cb(res.rows)
        });
    }

    /**
     * Find record by id
     * @param  {number}     id Record ID
     * @param  {Function}   cb Async return
     * @return {undefined}  [description]
     */
    find(id, cb) {
        id = v.escape(id === undefined ? '' : ''+id)
        this.db.query('SELECT * FROM todos WHERE id = $1', [id], (err, res) => {
            if (err || res.rows.length) return cb({})
            cb(res.rows[0])
        });
    }

    /**
     * Store record: insert or update
     * @param  {object}   todo Record as object
     * @param  {Function} cb   Async return
     * @return {[type]}        [description]
     */
    store(todo, cb) {
        var sql, values
        todo.text = v.escape(todo.text === undefined ? '' : todo.text)
        todo.status = v.escape(todo.status === undefined ? '' : todo.status)
        if (todo.id) {
            todo.id = v.escape(todo.id === undefined ? '' : ''+(todo.id))
            sql = 'UPDATE todos SET text = $1, status = $2 WHERE id = $3';
            values = [todo.text, todo.status, todo.id]
        } else {
            sql = 'INSERT INTO todos (text, status) VALUES ($1, $2) RETURNING id';
            values = [todo.text, todo.status]
        }
        this.db.query(sql, values, (err, res) => {
            if (err) return cb({})
            todo['id'] = !todo.id ? res.rows[0].id : todo['id']
            cb(todo)
        });
    }

    /**
     * Delete record
     * @param  {number}     id Record ID
     * @param  {Function}   cb Async return
     * @return {undefined}  [description]
     */
    remove(id, cb) {
        id = v.escape(id === undefined ? '' : ''+id)
        this.db.query('DELETE FROM todos WHERE id = $1', [id], (err, res) => {
            if (err) return cb(false)
            cb(true)
        });
    }

    /**
     * Clear all completed records
     * @param  {Function} cb Async return
     * @return {undefined}      [description]
     */
    clearCompleted(cb) {
        var values = ['completed']
        this.db.query('DELETE FROM todos WHERE status = $1', values, (err, res) => {
            if (err) return cb(false)
            cb(true)
        });
    }
}

module.exports = Todos
