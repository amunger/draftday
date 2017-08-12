'use strict'

var team = function(args){
  var args = args || {};
  this.id = args.id || nextID();
  this.name = args.name || '';
  this.owner = args.owner || '';
  this.players = args.players || [];

  this.countAtPosition = function(position){
    var posList = this.players.filter(function(p) {return p.position == position});
    return posList.length;
  }

  this.update = function(newData){
    console.log(newData);
    if (newData.name) this.name = newData.name;
    if (newData.owner) this.owner = newData.owner;
  }
}

module.exports = team;


var currentID = 1;
var nextID = function () {
  return currentID++;
}
