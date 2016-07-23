'use strict'
var model = require('../app/model');
var assert = require('assert');

describe('A league new league', function(){
  var league = new model.League({name: 'testname'});

  describe('when first created', function(){
    assert.equal(league.name, 'testname');
    assert(league.teams);
    assert(league.users);
  });
});

describe('A league with a list of teams', function (){
  var league = new model.League({name: 'testname'});
  league.addTeam({id:1, name:'team1'});
  league.addTeam({id:2, name:'team2'});
  league.addTeam({id:3, name:'team3'});

  it('getting the list should return those teams', function () {
    var teams = league.teams;
    assert(teams.length > 2, 'not enough teams');
  });

  describe('With new teams added', function() {
    league.addTeam({name:'team1'});
    league.addTeam({name:'team2'});

    it ('should give unique IDs to each team', function() {
      var teams = league.teams;
      assert(teams[2].id != teams[3].id);
      assert(teams[3].id != teams[4].id);
    });
  });

  describe('Selecting a player to a team', function(){
    var currentTeam = league.teams[0];
    league.addPlayerToCurrentTeam({id: 1, name: 'Player 1', position: 'WR'});

    it('The team should contain that player', function () {
      var player = currentTeam.players[0];
      assert.equal(player.name, 'Player 1');
    });

    it('Should move that team to the back of the order', function (){
      var newOrder = league.teams;
      assert.equal(newOrder[newOrder.length-1], currentTeam);
    });

  });
});
