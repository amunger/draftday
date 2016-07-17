var express = require('express');
var app = express();
var path = require ('path');
var bodyParser = require('body-parser');

var env = process.env.NODE_ENV || 'dev';

app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'jade');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.get('*', function(req, res) {
	res.render('index');
});

var port = 3000;
app.listen(port, function() {
	console.log('listening on port ' + port);
});
