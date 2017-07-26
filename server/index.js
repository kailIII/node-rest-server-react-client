
var restify = require('restify');
var Todos = require('./todos');
var todos = new Todos();

// Rest server
var server = restify.createServer();

// PLugins
server.use(restify.plugins.bodyParser({ mapParams: false }));

//In case of client axios js, it can make a pre-flight OPTIONS request
server.use(restify.plugins.fullResponse());
server.opts(/.*/i, function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD')
    res.header('Access-Control-Allow-Headers', 'content-type')
    res.header('Access-Control-Max-Age', 86400)
	res.send(200);
	next();
});

// Routes
server.get('/', function (req, res, next) {
    res.send('Welcome to REST server');
    next();
});

// Load todos routes
todos.setApi(server);

server.listen(8888, function() {
  console.log('%s listening at %s', server.name, server.url);
});
