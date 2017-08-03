
/**
 * Inport REST library
 * @type {Object}
 */
const restify = require('restify')

/**
 * Create REST server
 * @type {Object}
 */
const server = restify.createServer()

/**
 * Use parse JSON body requests
 */
server.use(restify.plugins.bodyParser({ mapParams: false }))

/**
 * For ANY pre-flight OPTIONS request,
 * Allow request and special request headers
 */
server.use(restify.plugins.fullResponse())
server.opts(/.*/i, function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS, HEAD')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD')
    res.header('Access-Control-Allow-Headers', 'content-type, x-authorization')
    res.header('Access-Control-Max-Age', 86400)
	res.send(200)
	next()
});

/**
 * Home route
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
server.get('/', (req, res, next) => {
    res.send('Welcome to REST server.')
    next()
})

module.exports = server
