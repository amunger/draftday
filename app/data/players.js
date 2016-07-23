'use strict'
var fs = require('fs');
var model = require('../model');

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
		var playerJson = './app/data/flatfiles/players.json';
		var data = fs.readFileSync(playerJson);
		var parsed = JSON.parse(data).forEach(function (player){
			players.push(new model.Player(player));
		});

	}
};

module.exports = players;
