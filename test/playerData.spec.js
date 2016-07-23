'use strict'
var assert = require('assert');
var data = require('../app/data');

describe('The data access object', function(){

	describe('The collection of players', function(){
		var players = data.players.getAll();

    it('should have a populated list of players', function () {
			assert(players.length > 0, 'Players is empty');
		});

		it('should allow to select a player by ID', function () {
			var player = data.players.getByID(1);
			assert(player.name && player.name.length > 0);
		});

		it('should return a list of players for that position', function (){
			var rbs = data.players.getByPosition('RB');
			assert(rbs.length > 0);
			rbs.forEach(function (rb) {
				assert.equal(rb.position, 'RB');
			});
		});
	});

	
});
