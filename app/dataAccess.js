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

	this.getByID = function (id){
		console.log(players.length);
		return players.find(function (player) { return player.id == id });
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

	var teamsInOrder = mockteamData;

	this.getAll = function () { return teamsInOrder; }

	this.addTeam = function (team) {
	  teamsInOrder.push(new model.Team(team));
	}

  this.getByID = function(id) {
    return teamsInOrder.find(function (team) { return team.id === id });
  }

  this.addPlayerToCurrentTeam = function(player){
		if(teamsInOrder.length > 0){
			console.log('Adding ' + player.name + ' to ' + teamsInOrder[0].name);
	    teamsInOrder[0].players.push(player);
			teamsInOrder.push(teamsInOrder.shift());
		}
  }
}



module.exports = {
	players: new players(),
	teams: new teams()
};
