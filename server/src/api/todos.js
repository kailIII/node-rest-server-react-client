
/**
 * Todos model
 */
class TodosApi {

    constructor(model, auth = false) {
        this.model = model;
        this.auth = auth;
    }

    /**
     * HTTP find all records
     * @param  {[type]}   req  [description]
     * @param  {[type]}   res  [description]
     * @param  {Function} next [description]
     * @return {[type]}        [description]
     */
    findAll(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        this.model.findAll((todos) => {
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
    find(req, res, next) {
        this.model.find(req.params.id, (todo) => {
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
    store(req, res, next) {
        this.model.store(req.body, (todo) => {
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
    remove(req, res, next) {
        this.model.remove(req.params.id, () => {
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
    clearCompleted(req, res, next) {
        this.model.clearCompleted(() => {
            this.findAll(req, res, next);
        });
    }

    /**
     * HTTP API
     * @param {[type]} server [description]
     */
    setApi(server) {

        // Authorization middleware
        if (this.auth) {
            server.use((req, res, next) => {
                if (req.url.startsWith('/todos')) {
                    this.auth.isAuthorized(req.headers['x-authorization'], (result) => {
                        if (result) {
                            return next();
                        } else {
                            res.header('Access-Control-Allow-Origin', '*');
                            res.send(401);
                        }
                    });
                } else {
                    return next()
                }
            });
        }

        server.get('/todos', this.findAll.bind(this));
        server.get('/todos/:id', this.find.bind(this));
        server.post('/todos', this.store.bind(this));
        server.del('/todos/:id', this.remove.bind(this));
        server.get('/todos/clear/:filter', this.clearCompleted.bind(this));
    }
}

module.exports = TodosApi;
