var assert = require('assert');
var model = require('../app/model');

describe('A new default team', function(){
  var team = new model.team.team;
  it('should have default fields set', function() {
    assert.equal(team.name, '', 'team name not valid');
    assert.equal(team.id, -1, 'team id not correct');
    assert(team.players, 'team players do not exist');
    assert(team.players.length == 0, 'team is not empty');
  });
});

describe('The list of teams', function (){
  model.team.addTeam(new model.team.team({id:1, name:'team1'}));
  model.team.addTeam(new model.team.team({id:2, name:'team2'}));
  model.team.addTeam(new model.team.team({id:3, name:'team3'}));
  it('getting the list should return those teams', function () {
    var teams = model.team.getTeams();
    assert(teams.length > 2, 'not enough teams');
  });

  describe('With new teams added', function() {
    model.team.addTeam(new model.team.team({name:'team1'}));
    model.team.addTeam(new model.team.team({name:'team2'}));

    it ('should give unique IDs to each team', function() {
      var teams = model.team.getTeams();
      assert(teams[3].id > 3, 'new team should have higher ID');
      assert(teams[3].id != teams[4].id);
    });
  });
});
