var parser = require('./parser');
var fs = require('fs');
var path = require('path');
var async = require('async');

var rawInputDir = './output/raw_saved/'

fs.readdir( rawInputDir, function( err, files ) {
	if( err ) {
		console.error("Could not list the directory.", err);
		process.exit(1);
	} 
	
	var players = [];
	async.each(files, function( file, callback ) {
		var inFile = path.join(rawInputDir, file);
		fs.readFile(inFile, function(err, data) {
			console.log('Reading file ' + inFile);
			players = players.concat(parser.parseHtmlForPlayers(data));
			callback();
		});
	}, function(err){
		fs.writeFile('./output/players.json', JSON.stringify(players), 'utf8', function(){console.log('done');});
	});
	
});
	