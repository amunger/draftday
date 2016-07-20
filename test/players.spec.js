var Player = require('../app/model/player');
var assert = require('assert');

describe('A list of added players', function() {
	var player1 = new Player({name: 'Adrian Peterson', position: 'RB', team: 'MIN'});
	var player2 = new Player({name: 'Aaron Rodgers', position: 'QB', team: 'GBP'});
	
	it('player should contain provided fields', function () {
		assert.equal(player1.name, 'Adrian Peterson')
		assert.equal(player1.position, 'RB');
		assert.equal(player1.team, 'MIN');
	});
	
	it('players should have unique id', function() {
		assert.notEqual(player1.id, player2.id);
	});
	
});