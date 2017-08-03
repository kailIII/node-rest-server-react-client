
/**
 * Todos HTTP API
 */
class TodosApi {

    /**
     * Init API
     * @param  {Todos}  model         The todos model
     * @param  {Boolean} [auth=false] Optional auth
     * @return {Object}               Todos API
     */
    constructor(model, auth = false, logger = false) {
        this.model = model
        this.auth = auth
        this.logger = logger
    }

    /**
     * HTTP API
     * @param {[type]} server [description]
     */
    setApi(server) {

        // Authorization middleware
        if (this.auth) {
            server.use((req, res, next) => {
                this.authorizationMiddleware(server, req, res, next)
            })
        }

        // API routes
        server.get('/todos', this.findAll.bind(this))
        server.get('/todos/:id', this.find.bind(this))
        server.post('/todos', this.store.bind(this))
        server.del('/todos/:id', this.remove.bind(this))
        server.get('/todos/clear/:filter', this.clearCompleted.bind(this))
    }

    /**
     * HTTP find all records
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    findAll(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        this.model.findAll((todos) => {
            res.send(todos)
        })
    }

    /**
     * HTTP find record by id
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    find(req, res, next) {
        this.model.find(req.params.id, (todo) => {
            res.send(todo)
        })
    }

    /**
     * HTTP save record
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    store(req, res, next) {
        this.model.store(req.body, (todo) => {
            res.header('Access-Control-Allow-Origin', '*')
            res.send(todo)
        })
    }

    /**
     * HTTP delete record
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    remove(req, res, next) {
        this.model.remove(req.params.id, () => {
            res.header('Access-Control-Allow-Origin', '*')
            res.send(200)
        })
    }

    /**
     * HTTP clear all completed records
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    clearCompleted(req, res, next) {
        this.model.clearCompleted(() => {
            this.findAll(req, res, next)
        })
    }

    /**
     * Authorization middleware (async)
     * @param  {Object}   server REST server
     * @param  {Object}   req    HTTP request
     * @param  {Object}   res    HTTP response
     * @param  {Function} next   Next configured route
     * @return {undefined}       Async return
     */
    authorizationMiddleware(server, req, res, next) {
        if (!req.url.startsWith('/todos')) return next()

        // Validate token for request IP address
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        this.auth.isAuthorized(req.headers['x-authorization'], ip, (result) => {
            if (result) return next()
            console.log('HTTP 401: ' + req.headers['x-authorization'] + ' ' + ip)
            res.header('Access-Control-Allow-Origin', '*')
            res.send(401)
        })
    }
}

module.exports = TodosApi;
