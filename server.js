var express = require('express');
var app = express();
var path = require ('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./app/routes');

var env = process.env.NODE_ENV || 'dev';

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

routes(app);

var port = process.env.PORT || 3001;
app.listen(port, function() {
	console.log('listening on port ' + port);
});
