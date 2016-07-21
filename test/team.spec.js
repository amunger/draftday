var assert = require('assert');
var team = require('../app/model/team');

describe('A new team', function(){
  var newteam = new team({name: 'test team', owner: 'user'});
  it('should have given and default fields set', function() {
    assert(newteam.id, 'the id should exist');
    assert.equal(newteam.name, 'test team', 'team name not valid');
    assert.equal(newteam.owner, 'user');
    assert(newteam.players, 'team players do not exist');
    assert(newteam.players.length == 0, 'team is not empty');
  });
  
});


