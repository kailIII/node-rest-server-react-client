

/**
 * Todos model
 */
class TodosApi {

    constructor(model) {
        this.model = model;
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
    httpFind(req, res, next) {
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
    httpPost(req, res, next) {
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
    httpDelete(req, res, next) {
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

module.exports = TodosApi;
