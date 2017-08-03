/**
 * Users model
 */
class Users {

    /**
     * Init users model
     */
    constructor(db) {
        this.db = db;
    }

    /**
     * Find record by username
     * @param  {String}     username Record ID
     * @param  {Function}   cb Async return
     * @return {undefined}  [description]
     */
    find(username, cb) {
        this.db.query('SELECT * FROM users WHERE username = $1', [username], (err, res) => {
            if (err || res.rows.length) return cb({})
            cb(res.rows[0])
        });
    }

    /**
     * Store record: insert or update
     * @param  {object}   user Record as object
     * @param  {Function} cb   Async return
     * @return {[type]}        [description]
     */
    store(user, cb) {
        var sql, values
        if (user.id) {
            sql = 'UPDATE users SET username = $1 WHERE id = $2'
            values = [user.username, user.id]
        } else {
            sql = 'INSERT INTO users (username) VALUES ($1) RETURNING id'
            values = [user.username]
        }
        this.db.query(sql, values, (err, res) => {
            if (err) return cb({})
            user['id'] = !user.id ? res.rows[0].id : user['id']
            cb(user)
        })
    }
}

module.exports = Users
