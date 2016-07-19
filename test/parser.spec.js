var assert = require('assert');
var parser = require('../scraper/parser');
var fs = require('fs');

describe('parsing a page of player data', function(){
	var data = fs.readFileSync('./test/testRawData.txt');
	var players = parser.parseHtmlForPlayers(data);
	
	it('should return an array of players', function() {
		assert(players && players.length > 0, 'players should have data');
	});
	it('should get player names, teams, position, and draft rank', function(){
		var p1 = players[0];
		assert(p1.name, 'missing name');
		assert(p1.team, 'missing team');
		assert(p1.position, 'missing position');
		assert(p1.rank, 'missing rank');
	});
});