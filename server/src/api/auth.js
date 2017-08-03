
/**
 * Auth API
 */
class AuthApi {

    /**
     * Init auth API
     */
    constructor(model, logger = false) {
        this.model = model
        this.logger = logger
    }

    /**
     * HTTP API
     * @param {[type]} server [description]
     */
    setApi(server) {
        server.post('/auth/login', this.login.bind(this))
        server.post('/auth/register', this.register.bind(this))
    }

    /**
     * HTTP login user
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    login(req, res, next) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        this.model.login(req.body, ip, (result) => {
            if (this.logger) {
                result.auth_token ? this.logger.log('AUTH LOGIN: ' + req.body.username + ' ' + ip)
                    : this.logger.log('AUTH FAILED: ' + req.body.username + ' ' + ip)
            }
            res.header('Access-Control-Allow-Origin', '*')
            res.send(result)
        })
    }

    /**
     * HTTP register user
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    register(req, res, next) {
        this.model.register(req.body, (user) => {
            res.header('Access-Control-Allow-Origin', '*')
            res.send(user)
        })
    }

    /**
     * Validates user access
     * @param  {[type]}   auth_token  The auth token to check
     * @param  {Function} cb Async return
     * @return {[type]}        [description]
     */
    isAuthorized(auth_token, ip, cb) {
        this.model.isTokenValid(auth_token, ip, (user) => {
            cb(user.id ? true : false)
        })
    }
}

module.exports = AuthApi
