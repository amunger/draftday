var _ = require('underscore');

var team = function(args){
  var args = args || {};
  this.id = args.id || nextTeamID();
  this.name = args.name || '';
  this.owner = args.owner || '';
  this.players = [];
}

var mockteamData = [new team({id: 1, name: 'team 1', owner: 'Mike Jones'}), new team({id: 2, name:'team 2', owner: 'Albert'})];

var teams = mockteamData;

var getTeams = function () { return teams; }

var addTeam = function (newTeam) {
  if (!newTeam.id || newTeam.id === -1){
    newTeam.id = nextTeamID();
  }
  teams.push(new team(newTeam));
}

module.exports = {
  team: team,
  getTeams: getTeams,
  addTeam: addTeam
}

var nextTeamID = function() {
  var currentHighest = _.max(_.pluck(teams, "id"));
  return currentHighest + 1;
}
