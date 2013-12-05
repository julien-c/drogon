
var fs = require('fs');
var _ = require('underscore');
var EPub = require("epub");

/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
app.disable('x-powered-by');

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
	
	var epub = new EPub(__dirname + '/uploads/0804137501Remote.epub');
	app.set('epub', epub);
	epub.parse();
}


/*
 * GET *
 */

app.get('*', function(req, res, next) {
	var path = req.params[0].substring(1);
	if (path) {
		var epub = app.get('epub');
		if (epub) {
			if (component = _.findWhere(epub.flow, {href: path})) {
				epub.getChapterRaw(component.id, function(err, html) {
					html = html.replace('</body>', '<script src="/javascripts/reader.js"></script></body>');
					res.send(html);
				});
			}
			else if (item = _.findWhere(epub.manifest, {href: path})) {
				epub.getFile(item.id, function(err, data, mimeType) {
					res.set('Content-Type', mimeType);
					res.send(data);
				});
			}
			else {
				next();
			}
		}
		else {
			next();
		}
	}
	else {
		next();
	}
});


/*
 * GET /
 */

app.get('/', function(req, res) {
	res.render('index');
});


/*
 * POST /uploads
 */

app.post('/uploads', function(req, res) {
	
	fs.readFile(req.files.file.path, function(err, data) {
		var name = req.files.file.name;
		var newPath = __dirname + '/uploads/' + name;
		fs.writeFile(newPath, data, function(err) {
			var epub = new EPub(newPath);
			app.set('epub', epub);
			epub.on('end', function() {
				var firstComponent = epub.flow[0];
				res.json({upload: 'success', firstComponent: firstComponent});
			});
			epub.parse();
		});
	});
});




http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
