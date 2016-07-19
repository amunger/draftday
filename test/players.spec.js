var player = require('../app/model/player');
var assert = require('assert');

describe('A list of added players', function() {
	var player1 = {name: 'Adrian Peterson', position: 'RB', team: 'MIN'};
	var player2 = {name: 'Aaron Rodgers', position: 'QB', team: 'GBP'};
	var player3 = {name: 'Baltimore Ravens', position: 'DEF'};
	var player4 = {name: 'James Starks', position: 'RB', team: 'GBP'};
	
	player.addPlayer(player1);
	player.addPlayer(player2);
	player.addPlayer(player3);
	player.addPlayer(player4);
	
	var players = player.getPlayers();
	
	it('should contain the added players', function () {
		assert(players.length > 2);
	});
	
	it('players should have unique id', function() {
		assert.notEqual(players[0].id, players[1].id);
		assert.notEqual(players[1].id, players[2].id);
	});
	
	describe('selecting players by position', function(){
		var rbs = player.getByPosition('RB');
		
		it('should return a list of players for that position', function (){
			assert(rbs.length > 0);
			rbs.forEach(function (rb) {
				assert.equal(rb.position, 'RB');
			});
		});
	});
	
	
});