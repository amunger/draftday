'use strict'
var fs = require('fs');
var model = require('./model');

var players = function (){
	var players = [];

	this.getAll = function(){
		if (players.length === 0){
			readInPlayers();
		}
		return players;
	}

	this.getByPosition = function (position) {
	  return players.filter(function (p) { return p.position === position });
	}

	this.addPlayer = function (player){
		players.push(new model.Player(player));
	}

	var readInPlayers = function (){
		var playerJson = './app/data/players.json';
		var data = fs.readFileSync(playerJson);
		var parsed = JSON.parse(data).forEach(function (player){
			players.push(new model.Player(player));
		});

	}
};

var mockteamData = [new model.Team({name:'Madden\'s all-stars', owner: 'John Madden'}), new model.Team({name:'Make Football Great Again', owner: 'Albert'}), new model.Team({name: 'Out of your league', owner: 'Ishmael'})];
var teams = function (){

	var teams = mockteamData;

	this.getAll = function () { return teams; }

	this.addTeam = function (team) {
	  teams.push(new model.Team(team));
	}
  
  this.getByID = function(id) {
    return teams.find(function (team) { return team.id === id });
  }
  
  this.addPlayerToTeam = function(teamID, player){
    var playerToAdd = new model.Player(player);
    var team = this.getByID(teamID);
    team.players.push(playerToAdd);
  }
}



module.exports = {
	players: new players(),
	teams: new teams()
};
