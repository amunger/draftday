var assert = require('assert');

var player = function(args){
  assert(args.name);
  this.id = args.id || nextPlayerID();
  this.name = args.name;
  this.position = args.position && args.position.toUpperCase() || '';
  this.team = args.team && args.team.toUpperCase() || '';
  this.bye = args.bye || 0;
  this.available = true;
}

var addPlayer = function (newPlayer){
  players.push(new player(newPlayer));
}

var players = [];

var getPlayers = function (){
   return players;
}

var getByPosition = function (position) {
  return players.filter(function (p) { return p.position === position });
}

module.exports = {
  player: player,
  addPlayer: addPlayer,
  getPlayers: getPlayers,
  getByPosition: getByPosition
}

currentID = 1;
var nextPlayerID = function () {
  return currentID++;
}