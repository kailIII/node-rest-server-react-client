
const Todos = require('./models/todos');
const TodosApi = require('./api/todos');
const server = require('./api/server');
const config = require('./config');

// Load todos API
const todos = new TodosApi(new Todos());
todos.setApi(server);

// Finally, start server
server.listen(config.rest.port, function() {
  console.log('%s listening at %s', server.name, server.url);
});
