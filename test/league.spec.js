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
  league.addTeam({id:3, name:'team2'});
  league.addTeam({id:4, name:'team2'});

  it('getting the list should return those teams', function () {
    var teams = league.teams;
    assert(teams.length > 2, 'not enough teams');
  });

  describe('With new teams added', function() {
    league.addTeam({name:'team1'});
    league.addTeam({name:'team2'});

    it ('should give unique IDs to each team', function() {
      var teams = league.teams;
      for(let i = 0; i < teams.length - 1; i++){
        for (let j = i+1; j < teams.length; j++){
          assert(teams[i].id != teams[j].id, "teams " + i + " and " + j + " have the same ID");
        }
      }
    });
  });

  describe('Selecting players to a team', function(){

    before(function(){
      league.addPlayerToCurrentTeam({id: 1, name: 'Player 1', position: 'WR'});
      league.addPlayerToCurrentTeam({id: 2, name: 'Player 2', position: 'RB'});
    });

    it('The first team should contain the first player added', function () {
      var firstTeam = league.teams[0];
      assert.equal(1, firstTeam.players.length);
      var player = firstTeam.players[0];
      assert.equal(player.name, 'Player 1');
    });

    it('The next selected player should go on the next team', function (){
      var secondTeam = league.teams[1];
      assert.equal(1, secondTeam.players.length);
      var player = secondTeam.players[0];
      assert.equal(player.name, 'Player 2');
    });

  });

  describe('Editing one of those teams', function (){
    var newName = 'new name';
    var newPosition = 1;
    var originalCount = league.teams.length;
    var team = {
      id : league.teams[2].id,
      name : newName
    };
    league.updateTeam(team, newPosition);

    it ('Should be in the new position', function(){
      assert(league.teams[newPosition].id == 3);
    });

    it ('Should have the new name', function(){
      assert(league.teams[newPosition].name == newName);
    });

    it ('Should have the same number of teams in the league', function(){
      assert(league.teams.length == originalCount);
    });

    it ('Should still have the original fields when not updated', function(){
      assert(league.teams[newPosition].players, 'players should not be null');
    });
  });

  describe('When selecting to teams at the end of the order', function(){
    var lastTeam = league.teams[league.teams.length-1];
    before(function(){
      league.addPlayerToCurrentTeam({id: 1, name: 'Player 4', position: 'WR'});
      league.addPlayerToCurrentTeam({id: 2, name: 'Player 5', position: 'RB'});
      league.addPlayerToCurrentTeam({id: 3, name: 'Player 6', position: 'WR'});
      league.addPlayerToCurrentTeam({id: 4, name: 'Player 7', position: 'RB'});
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
