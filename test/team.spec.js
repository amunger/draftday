var assert = require('assert');
var team = require('../app/model/team');

describe('A new default team', function(){
  var newteam = new team();
  it('should have default fields set', function() {
    assert.equal(newteam.name, '', 'team name not valid');
    assert(newteam.players, 'team players do not exist');
    assert(newteam.players.length == 0, 'team is not empty');
  });
});

