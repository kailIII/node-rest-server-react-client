
const { Pool, Client } = require('pg')
const Todos = require('./models/todos')
const TodosApi = require('./api/todos')
const Auth = require('./models/auth')
const AuthApi = require('./api/auth')
const server = require('./api/server')
const Logger = require('./models/logger')
const config = require('./config')
const path = process.cwd()
console.log(path);

/**
 * Init logger
 * @type {Logger}
 */
const logger = new Logger(path+'/'+config.log.default, path+'/'+config.log.errors)

/**
 * Init shared database connection
 * @type {Pool}
 */
const pool = new Pool(config.db1)

// Load auth API
const auth = new AuthApi(new Auth(pool), logger)
auth.setApi(server)

// Load todos API
const todos = new TodosApi(new Todos(pool), auth, logger)
todos.setApi(server)

/**
 * Finally, start server
 * Set 443 on config.rest.port for HTTPS server instead
 */
server.listen(config.rest.port, () => {
    console.log('%s listening at %s', server.name, server.url)
})
