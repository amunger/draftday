var assert = require('assert');
var team = require('../app/model/team');

describe('A new team', function(){

  describe('with only name and owner', function (){
    var newteam = new team({name: 'test team', owner: 'user'});
    it('should have given and default fields set', function() {
      assert(newteam.id, 'the id should exist');
      assert.equal(newteam.name, 'test team', 'team name not valid');
      assert.equal(newteam.owner, 'user');
      assert(newteam.players, 'team players do not exist');
      assert(newteam.players.length == 0, 'team is not empty');
    });
  });

  describe('With some players', function (){
    var newteam = new team({name: 'test team', owner: 'user'});
    newteam.players.push({id: 1, name: "player1", position: "WR"});
    newteam.players.push({id: 2, name: "player2", position: "QB"});
    newteam.players.push({id: 3, name: "player3", position: "WR"});

    it('should count players at a position', function (){
      assert.equal(newteam.countAtPosition("WR"), 2);
    });
  });

});
