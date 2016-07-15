var app = require('express')();
var path = require ('path');

var env = process.env.NODE_ENV || 'dev';

app.set('views', path.join(__dirname + '/app/views'));
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	res.render('index');
});

var port = 3000;
app.listen(port, function() {
	console.log('listening on port ' + port);
});
