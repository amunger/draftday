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

module.exports = player;

currentID = 1;
var nextPlayerID = function () {
  return currentID++;
}