
var fs = require('fs');

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
	var name = req.session.epub;
	console.log(app.get('file-'+name));
	
	res.render('index');
});

app.post('/uploads', function(req, res) {
	
	// fs.readFile(req.files.file.path, function(err, data) {
	// 	var name = req.files.file.name;
	// 	var newPath = __dirname + "/../uploads/" + name;
	// 	fs.writeFile(newPath, data, function(err) {
	// 		res.json({upload: 'success'});
	// 	});
	// });
	
	var name = req.files.file.name;
	app.set('file-'+name, fs.readFileSync(req.files.file.path));
	req.session.epub = name;
	res.json({upload: 'success'});
});

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
