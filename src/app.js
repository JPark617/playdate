// your application's code
const express = require('express'),
	router = express.Router();
	posts = require('./post/post.routes'),
	users = require('./user/user.routes'),
	http = require('http'),
	path = require('path'),
	favicon = require('serve-favicon'),
	mongoose = require('mongoose'),
	dbUrl = 'mongodb+srv://playdate_user:playdate_pass@main-cluster-ajh0r.mongodb.net/test?retryWrites=true&w=majority',
	db = mongoose.connect(dbUrl, {safe: true}),
	//Express middleware
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	//log requests to the terminal
	logger = require ('morgan'),
	errorHandler = require('errorhandler'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

const app = express();
app.locals.appTitle = 'The Network';
app.locals.admin = false;
app.locals.error = null;
//Express configurations
app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//app.use(cookieParser('3CCC4ACD-6ED1-4844-9217-82131BDCB239'));
//exposes the res.session object in each request
//handler and stores data
app.use(session({
	secret: '2C44774A-D649-4D44-9535-46E296EF984F',
	resave: false,
	saveUninitialized: false}));
app.use(methodOverride());

//authentication middleware
app.use(function (req, res, next) {
	if (req.session && req.session.admin) {
		res.locals.admin = true;
	}
	next();
});


if ('development' === app.get('env')) {
	app.use(errorHandler());
}
//must go before routes to work
//https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(posts);
app.use(users);
app.get('*', function (req, res) {
	res.sendStatus(404);
});

var server = http.createServer(app);

var boot = function () {
	server.listen(app.get('port'), function () {
		console.info('Express server listening on port', app.get('port'));
	});
};

var shutdown = function () {
	server.close();
};

if (require.main === module) {
	boot();
} else {
	console.info('Running app as a module');
	exports.boot = boot;
	exports.shutdown = shutdown;
	exports.port = app.get('port');
}

