/**
 * Todos model
 */
class Todos {

    /**
     * Init Todos model
     */
    constructor(db) {
        this.db = db;
    }

    /**
     * Get all records
     * @param  {Function} cb    Async return
     * @return {undefined}      [description]
     */
    findAll(cb) {
        this.db.query('SELECT * FROM todos', (err, res) => {
            if (!err) {
                cb(res.rows);
            } else {
                cb([]);
            }
        });
    }

    /**
     * Find record by id
     * @param  {number}     id Record ID
     * @param  {Function}   cb Async return
     * @return {undefined}  [description]
     */
    find(id, cb) {
        this.db.query('SELECT * FROM todos WHERE id = $1', [id], (err, res) => {
            if (!err && res.rows.length) {
                cb(res.rows[0]);
            } else {
                cb({});
            }
        });
    }

    /**
     * Store record: insert or update
     * @param  {object}   todo Record as object
     * @param  {Function} cb   Async return
     * @return {[type]}        [description]
     */
    store(todo, cb) {
        var i, sql, values;
        if (todo.id) {
            sql = 'UPDATE todos SET text = $1, status = $2 WHERE id = $3';
            values = [todo.text, todo.status, todo.id];
        } else {
            sql = 'INSERT INTO todos (text, status) VALUES ($1, $2) RETURNING id';
            values = [todo.text, todo.status];
        }
        this.db.query(sql, values, (err, res) => {
            if (!err) {
                if (!todo.id) {
                    todo.id = res.rows[0].id;
                }
                cb(todo);
            } else {
                cb({});
            }
        });
    }

    /**
     * Delete record
     * @param  {number}     id Record ID
     * @param  {Function}   cb Async return
     * @return {undefined}  [description]
     */
    remove(id, cb) {
        this.db.query('DELETE FROM todos WHERE id = $1', [id], (err, res) => {
            if (!err) {
                cb();
            } else {
                cb();
            }
        });
    }

    /**
     * Clear all completed records
     * @param  {Function} cb Async return
     * @return {undefined}      [description]
     */
    clearCompleted(cb) {
        var values = ['completed'];
        this.db.query('DELETE FROM todos WHERE status = $1', values, (err, res) => {
            cb();
        });
    }
}

module.exports = Todos;
