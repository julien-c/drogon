
var fs = require('fs');

/*
 * GET /
 */

// exports.index = function(req, res) {
// 	// console.log(req.session);
// 	// req.session.user = {foo: 'bar'};
	
// 	console.log();
	
// 	res.render('index');
// };

/*
 * POST /uploads
 */

// exports.upload = function(req, res) {
	
// 	// fs.readFile(req.files.file.path, function(err, data) {
// 	// 	var name = req.files.file.name;
// 	// 	var newPath = __dirname + "/../uploads/" + name;
// 	// 	fs.writeFile(newPath, data, function(err) {
// 	// 		res.json({upload: 'success'});
// 	// 	});
// 	// });
	
// 	var name = req.files.file.name;
// 	app.set('file-'+name, fs.readFileSync(req.files.file.path));
// 	req.session.epub = {name: name};
// };
