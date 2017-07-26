
var todos = [];

function Todos() {

    const self = this;

    function find(id) {
        for(var i = 0; i < todos.length; i++) {
            if (todos[i].id === id) return todos[i];
        }
        return {}
    }

    function findAll() {
        return todos;
    }

    function store(todo) {
        var i;
        if (todo.id && (old = find(todo.id))) {
            i = todos.indexOf(old);
            todos[i] = todo;
        } else {
            todo.id = Math.random().toString(36).substr(2, 6);
            todos.push(todo);
        }
        return todo;
    }

    function remove(id) {
        var lookup = {};
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].id === id) {
                todos.splice(i, 1);
            }
        }
    }

    function respondFindAll(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.send(todos);
        next();
    }

    function respondFind(req, res, next) {
        res.send(find(req.params.id));
        next();
    }

    function respondPost(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.send(store(req.body));
        next();
    }

    function respondDelete(req, res, next) {
        remove(req.params.id);
        res.header('Access-Control-Allow-Origin', '*')
        res.send(200);
        next();
    }

    function setApi(server) {
        server.get('/todos', respondFindAll);
        server.get('/todos/:id', respondFind);
        server.post('/todos', respondPost);
        server.del('/todos/:id', respondDelete);
    }

    return {
        find: find,
        findAll: findAll,
        store: store,
        remove: remove,
        setApi: setApi
    }
}

module.exports = Todos;
