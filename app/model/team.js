'use strict'
var _ = require('underscore');

var team = function(args){
  var args = args || {};
  this.id = nextID();
  this.name = args.name || '';
  this.owner = args.owner || '';
  this.players = [];
  
}

module.exports = team;


var currentID = 1;
var nextID = function () {
  return currentID++;
}
