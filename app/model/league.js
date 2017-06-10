'use strict'
var assert = require('assert');
var Team = require('./team');

var league = function (args){
  assert(args.name, 'A league needs a name');
  this.name = args.name
  this.teams = args.teams || [];
  this.currentPick = args.currentPick || 0;

  this.addTeam = function (team){
    this.teams.push(new Team(team));
  };

  this.updateTeam = function (team, position){
    assert(team.id, 'Team must have an ID to update');
    var originalPosition = findTeamPosition(this.teams, team.id);
    assert(team.id, 'Team ID not found to perform update');
    this.teams.splice(originalPosition,1);
    this.teams.splice(position, 0, team);
  }

  var findTeamPosition = function (teams, teamID){
    for (let i = 0; i < teams.length; i++){
      if (teams[i].id == teamID){
        return i;
      }
    }
  }

  this.addPlayerToCurrentTeam = function(player){
    var teamList = this.teams;
    if(teamList.length > 0){
      console.log('Adding ' + player.name + ' to ' + teamList[this.currentPick].name);
      teamList[this.currentPick].players.push(player);
      if (++this.currentPick > teamList.length-1){
        this.teams.reverse();
        this.currentPick = 0;
      }
    }
  };

  this.undoLastPick = function(){
    var teamList = this.teams;
    if(teamList.length > 0){
      if (this.currentPick == 0){
        this.teams.reverse();
        this.currentPick = teamList.length -1;
      } else{
        this.currentPick--;
      }

      if (teamList[this.currentPick].players.length > 0){
        var removed = teamList[this.currentPick].players.pop();
        console.log('removing ' + removed.name + ' from ' + teamList[0].name);
      }
    }
  }
}

module.exports = league;
