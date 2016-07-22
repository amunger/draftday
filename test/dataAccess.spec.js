'use strict'
var assert = require('assert');
var data = require('../app/dataAccess');

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

	describe('The list of teams', function (){
	  data.teams.addTeam({id:1, name:'team1'});
	  data.teams.addTeam({id:2, name:'team2'});
	  data.teams.addTeam({id:3, name:'team3'});

	  it('getting the list should return those teams', function () {
      var teams = data.teams.getAll();
      assert(teams.length > 2, 'not enough teams');
	  });

    it('can retrieve team by ID', function (){
      var team1 = data.teams.getByID(1);
      assert(team1.name, 'team1');
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

    describe('Selecting a player to a team', function(){
			var currentTeam = data.teams.getAll()[0];
      data.teams.addPlayerToCurrentTeam({id: 1, name: 'Player 1', position: 'WR'});

      it('The team should contain that player', function () {
        var player = currentTeam.players[0];
        assert.equal(player.name, 'Player 1');
      });

			it('Should move that team to the back of the order', function (){
				var newOrder = data.teams.getAll();
				assert.equal(newOrder[newOrder.length-1], currentTeam);
			});

    });
	});
});
