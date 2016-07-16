var express = require('express');
var app = express();
var path = require ('path');

var env = process.env.NODE_ENV || 'dev';

app.use(express.static('public'));

var port = 3000;
app.listen(port, function() {
	console.log('listening on port ' + port);
});
