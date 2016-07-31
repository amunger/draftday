'use strict'
var model = require('../app/model');
var assert = require('assert');

describe('A league new league', function(){
  var league = new model.League({name: 'name of the league'});

  describe('when first created', function(){
    it('will have fields set up', function() {
      assert.equal(league.name, 'name of the league');
      assert(league.teams);
    });
  });


});

describe('A league with a list of teams', function (){
  var league = new model.League({name: 'name of the league'});
  league.addTeam({id:1, name:'team1'});
  league.addTeam({id:2, name:'team2'});

  it('getting the list should return those teams', function () {
    var teams = league.teams;
    assert(teams.length > 2, 'not enough teams');
  });

  describe('With new teams added', function() {
    league.addTeam({name:'team1'});
    league.addTeam({name:'team2'});

    it ('should give unique IDs to each team', function() {
      var teams = league.teams;
      assert(teams[0].id != teams[2].id);
      assert(teams[1].id != teams[2].id);
      assert(teams[1].id != teams[3].id);
    });
  });

  describe('Selecting players to a team', function(){
    var firstTeam = league.teams[0];
    var secondTeam = league.teams[1];

    before(function(){
      league.addPlayerToCurrentTeam({id: 1, name: 'Player 1', position: 'WR'});
      league.addPlayerToCurrentTeam({id: 2, name: 'Player 2', position: 'RB'});
    });

    it('The first team should contain the first player added', function () {
      assert.equal(1, firstTeam.players.length);
      var player = firstTeam.players[0];
      assert.equal(player.name, 'Player 1');
    });

    it('The next selected player should go on the next team', function (){
      assert.equal(1, secondTeam.players.length);
      var player = secondTeam.players[0];
      assert.equal(player.name, 'Player 2');
    });

  });

  describe('When selecting to teams at the end of the order', function(){
    var lastTeam = league.teams[league.teams.length-1];
    before(function(){
      league.addPlayerToCurrentTeam({id: 1, name: 'Player 4', position: 'WR'});
      league.addPlayerToCurrentTeam({id: 2, name: 'Player 5', position: 'RB'});
    });

    it('The next team to select should be the last team again', function (){
      assert.equal(lastTeam.name, league.teams[league.currentPick].name);
      league.addPlayerToCurrentTeam({id: 123, name: 'Player last', position: 'WR'});
      var player = lastTeam.players[lastTeam.players.length-1];
      assert.equal(player.name, 'Player last');
    })
  });

  describe('Undoing a selected player', function (){
    var currentTeam;
    var startingPlayerCount;

    before(function(){
      currentTeam = league.teams[league.currentPick];
      startingPlayerCount = currentTeam.players.length;
      league.addPlayerToCurrentTeam({id: 11, name: 'Player to undo', position: 'WR'});
      league.addPlayerToCurrentTeam({id: 22, name: 'Player2 to undo', position: 'WR'});
      league.undoLastPick();
      league.undoLastPick();
    });

    it('The team should not contain that player', function () {
      console.log(currentTeam);
      assert.equal(startingPlayerCount, currentTeam.players.length);
    });

    it('Should have the team back in the previous order', function (){
      var newOrder = league.teams;
      assert.equal(newOrder[league.currentPick].name, currentTeam.name);
    });
  });

});
