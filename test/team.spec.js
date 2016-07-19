var assert = require('assert');
var team = require('../app/model/team');

describe('A new default team', function(){
  var newteam = new team.team;
  it('should have default fields set', function() {
    assert.equal(newteam.name, '', 'team name not valid');
    assert(newteam.players, 'team players do not exist');
    assert(newteam.players.length == 0, 'team is not empty');
  });
});

describe('The list of teams', function (){
  team.addTeam(new team.team({id:1, name:'team1'}));
  team.addTeam(new team.team({id:2, name:'team2'}));
  team.addTeam(new team.team({id:3, name:'team3'}));
  it('getting the list should return those teams', function () {
    var teams = team.getTeams();
    assert(teams.length > 2, 'not enough teams');
  });

  describe('With new teams added', function() {
    team.addTeam(new team.team({name:'team1'}));
    team.addTeam(new team.team({name:'team2'}));

    it ('should give unique IDs to each team', function() {
      var teams = team.getTeams();
      assert(teams[2].id != teams[3].id);
      assert(teams[3].id != teams[4].id);
    });
  });
});
