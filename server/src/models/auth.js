
const bcrypt = require('bcrypt')
const Users = require('./users')

/**
 * Auth model
 */
class Auth {

    /**
     * Init users model
     */
    constructor(db) {
        this.db = db
        this.users = new Users(db)
    }

    /**
     * Check auth token for validity
     * @param  {String}     auth_token The auth token
     * @param  {Function}   cb Async return
     * @return {undefined}  [description]
     */
    isTokenValid(auth_token, ip, cb) {
        var sql = 'SELECT * FROM users WHERE auth_token = $1 AND auth_ip = $2',
            values = [auth_token, ip]
        this.db.query(sql, values, (err, res) => {
            !err && res.rows.length ? cb(res.rows[0]) : cb({})
        })
    }

    /**
     * Login user
     * @param  {String}     username Record ID
     * @param  {Function}   cb Async return
     * @return {undefined}  [description]
     */
    login(user, ip, cb) {
        var sql = 'SELECT id, username FROM users WHERE username = $1 AND password = $2',
            values = [user.username]
        this.encrypt(user.password, false, (err, hash) => {
            values.push(hash)
            this.db.query(sql, values, (err, res) => {
                if (err || !res.rows.length) return cb({})
                user = res.rows[0]
                user['auth_token'] = this.generateAuthToken()
                this.storeToken(user, user.auth_token, ip, () => {
                    cb({auth_token: user.auth_token})
                });
            });
        });
    }

    /**
     * Register new user
     * @param  {object}   user Record as object
     * @param  {Function} cb   Async return
     * @return {[type]}        [description]
     */
    register(user, cb) {
        var password = user.password;
        this.users.find(user.username, (result) => {
            if (result.id) return cb(false)
            this.users.store(user, (user2) => {
                this.changePassword(user2, password, () => {
                    cb(user)
                });
            })
        })
    }

    /**
     * Change password
     * @param  {object}   user Record as object
     * @param  {String}   password The password to be stored
     * @param  {Function} cb   Async return
     * @return {[type]}        [description]
     */
    changePassword(user, password, cb) {
        this.encrypt(password, false, (err, hash) => {
            if (err) return cb({})
            var sql, values
            sql = 'UPDATE users SET password = $1 WHERE id = $2'
            values = [hash, user.id]
            this.db.query(sql, values, (err, res) => {
                if (!err) {
                    cb(user)
                } else {
                    cb({})
                }
            });
        });
    }

    /**
     * Set auth token
     * @param  {object}   user Record as object
     * @param  {String}   token The password to be stored
     * @param  {Function} cb   Async return
     * @return {[type]}        [description]
     */
    storeToken(user, auth_token, ip, cb) {
        var sql= 'UPDATE users SET auth_token = $1, auth_ip = $2 WHERE id = $3',
            values = [auth_token, ip, user.id]
        this.db.query(sql, values, (err, res) => {
            if (err) return cb({})
            cb(user)
        });
    }

    /**
     * Generates a new authentication token
     * @return {String} The token result
     */
    generateAuthToken() {
        return 'T' + (Math.random().toString(36).substr(1));
    }

    /**
     * Encrypt password
     * @param  {String}   string    The original string
     * @param  {boolean}   auto     Option for bcrypt
     * @param  {Function} cb        Callback
     * @return {undefined}          Async return
     */
    encrypt(string, auto, cb) {
        const config = require('../config')
        if (auto) {
            bcrypt.genSalt(config.encrypt.salt_rounds, (err, salt) => {
                err ? console.log(err) : false
                bcrypt.hash(string, salt, cb)
            });
        } else {
            bcrypt.hash(string, config.encrypt.salt, cb)
        }
    };
}

module.exports = Auth
