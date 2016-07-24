'use strict'
var assert = require('assert');
var Team = require('./team');

var league = function (args){
  assert(args.name, 'A league needs a name');
  this.name = args.name
  this.teams = args.teams || [];
  this.users = args.users || [];

  this.addTeam = function (team){
    this.teams.push(new Team(team));
  };

  this.addPlayerToCurrentTeam = function(player){
    var teamList = this.teams;
    if(teamList.length > 0){
      console.log('Adding ' + player.name + ' to ' + teamList[0].name);
      teamList[0].players.push(player);
      teamList.push(teamList.shift());
    }
  };

  this.undoLastPick = function(){
    var teamList = this.teams;
    if(teamList.length > 0){
      teamList.unshift(teamList.pop());
      if (teamList[0].players.length > 0){
        var removed = teamList[0].players.pop();
        console.log('removing ' + removed.name + ' from ' + teamList[0].name);
      }
    }
  }
}

module.exports = league;
