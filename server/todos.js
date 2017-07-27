
const { Pool, Client } = require('pg')

/**
 * Init database connection
 * @type {Pool}
 */
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nodetodos',
    password: 'postgres',
    port: 5432,
});

/**
 * Todos model
 */
class Todos {

    /**
     * Get all records
     * @param  {Function} cb    Async return
     * @return {undefined}      [description]
     */
    findAll(cb) {
        pool.query('SELECT * FROM todos', (err, res) => {
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
        pool.query('SELECT * FROM todos WHERE id = $1', [id], (err, res) => {
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
            sql = 'UPDATE todos SET text = $1, complete = $2 WHERE id = $3';
            values = [todo.text, todo.complete, todo.id];
        } else {
            sql = 'INSERT INTO todos (text, complete) VALUES ($1, $2) RETURNING id';
            values = [todo.text, todo.complete];
        }
        pool.query(sql, values, (err, res) => {
            if (!err) {
                if (todo.id === '') {
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
        pool.query('DELETE FROM todos WHERE id = $1', [id], (err, res) => {
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
        pool.query('DELETE FROM todos WHERE complete', (err, res) => {
            cb();
        });
    }

    /**
     * HTTP find all records
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    httpFindAll(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        this.findAll((todos) => {
            res.send(todos);
            next();
        });
    }

    /**
     * HTTP find record by id
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    httpFind(req, res, next) {
        this.find(req.params.id, (todo) => {
            res.send(todo);
            next();
        });
    }

    /**
     * HTTP save record
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    httpPost(req, res, next) {
        this.store(req.body, (todo) => {
            res.header('Access-Control-Allow-Origin', '*')
            res.send(todo);
            next();
        });
    }

    /**
     * HTTP delete record
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    httpDelete(req, res, next) {
        this.remove(req.params.id, () => {
            res.header('Access-Control-Allow-Origin', '*')
            res.send(200);
            next();
        });
    }

    /**
     * HTTP clear all completed records
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    httpClearCompleted(req, res, next) {
        var self = this;
        self.clearCompleted(() => {
            self.httpFindAll(req, res, next);
        });
    }

    /**
     * HTTP API
     * @param {[type]} server [description]
     */
    setApi(server) {
        server.get('/todos', this.httpFindAll.bind(this));
        server.get('/todos/:id', this.httpFind.bind(this));
        server.post('/todos', this.httpPost.bind(this));
        server.del('/todos/:id', this.httpDelete.bind(this));
        server.get('/todos/clear/:filter', this.httpClearCompleted.bind(this));
    }
}

module.exports = Todos;
