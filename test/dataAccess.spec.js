'use strict'
var assert = require('assert');
var data = require('../app/dataAccess');

describe('The data access object', function(){
	
	describe('The collection of players', function(){
		var players = data.players.getAll();
		
    it('should have a populated list of players', function () {
			assert(players.length > 0, 'Players is empty');
		});
		
		it('should return a list of players for that position', function (){
			var rbs = data.players.getByPosition('RB');
			assert(rbs.length > 0);
			rbs.forEach(function (rb) {
				assert.equal(rb.position, 'RB');
			});
		});
	});
	
	describe('The list of teams', function (){
	  data.teams.addTeam({id:1, name:'team1'});
	  data.teams.addTeam({id:2, name:'team2'});
	  data.teams.addTeam({id:3, name:'team3'});
	  
	  it('getting the list should return those teams', function () {
		var teams = data.teams.getAll();
		assert(teams.length > 2, 'not enough teams');
	  });

	  describe('With new teams added', function() {
		data.teams.addTeam({name:'team1'});
		data.teams.addTeam({name:'team2'});

		it ('should give unique IDs to each team', function() {
		  var teams = data.teams.getAll();
		  assert(teams[2].id != teams[3].id);
		  assert(teams[3].id != teams[4].id);
		});
	  });
	});
});