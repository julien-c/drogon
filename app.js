
var fs = require('fs');
var _ = require('underscore');
var EPub = require("epub");

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

/*
 * GET /
 */

app.get('/', function(req, res) {
	// var name = req.session.epub;
	// console.log(app.get('file-'+name));
	// res.render('index');
	
	var epub = new EPub('uploads/0804137501Remote.epub');
	app.set('epub', epub);
	
	epub.on("error", function(err){
	    console.log("ERROR\n-----");
	    throw err;
	});
	
	epub.on("end", function() {
		var firstComponent = epub.flow[0];
		// res.send(200);
		res.redirect(firstComponent.href);
	});
	
	epub.parse();
});

/*
 * POST /uploads
 */

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

app.get('*', function(req, res) {
	var path = req.params[0].substring(1);
	console.log(path);
	var epub = app.get('epub');
	// console.log(epub.flow);
	var component = _.findWhere(epub.flow, {href: path});
	
	
	console.log(epub.manifest);
	
	// if (component) {
	// 	epub.getChapter(component.id, function(err, data) {
	//         if(err){
	//             console.log(err);
	//             return;
	//         }
	//         console.log("\nFIRST CHAPTER:\n");
	//         console.log(data); // first 512 bytes
	//         res.send(data);
	//     });
	// }
	// else {
	// 	res.send(200);
	// }
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
