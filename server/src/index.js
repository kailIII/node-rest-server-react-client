
const { Pool, Client } = require('pg')
const Todos = require('./models/todos');
const TodosApi = require('./api/todos');
const Auth = require('./models/auth');
const AuthApi = require('./api/auth');
const server = require('./api/server');
const config = require('./config');

/**
 * Init database connection
 * @type {Pool}
 */
const pool = new Pool(config.db1);

// Load auth API
const auth = new AuthApi(new Auth(pool));
auth.setApi(server);

// Load todos API
const todos = new TodosApi(new Todos(pool), auth);
todos.setApi(server);

// Finally, start server
server.listen(config.rest.port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
