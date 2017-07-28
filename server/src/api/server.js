
const restify = require('restify');

// Rest server
var server = restify.createServer();

// PLugins
server.use(restify.plugins.bodyParser({ mapParams: false }));

//In case of pre-flight OPTIONS request
server.use(restify.plugins.fullResponse());
server.opts(/.*/i, function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD')
    res.header('Access-Control-Allow-Headers', 'content-type, x-authorization')
    res.header('Access-Control-Max-Age', 86400)
	res.send(200);
	next();
});

// Home route
server.get('/', function (req, res, next) {
    res.send('Welcome to TODOS REST server, using PostgreSQL as database');
    next();
});

module.exports = server;
