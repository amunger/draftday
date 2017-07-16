'use strict'

var team = function(args){
  var args = args || {};
  this.id = nextID();
  this.name = args.name || '';
  this.owner = args.owner || '';
  this.players = [];

  this.countAtPosition = function(position){
    var posList = this.players.filter(function(p) {return p.position == position});
    return posList.length;
  }

  this.update = function(args){
    this.name = args.name || this.name;
    this.owner = args.owner || this.owner;
    this.players = args.players || this.players;
  }
}

module.exports = team;


var currentID = 1;
var nextID = function () {
  return currentID++;
}
