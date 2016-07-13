var app = require('express')();

app.get('/', function(req, res) {
	res.send("Hello World");
});

app.listen(3000, function() {
	console.log('listening on port 3000');
});
