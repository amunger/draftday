'use strict'
var redisClient = require('./redisClient');
var model = require('../model');
var assert = require('assert');

var leagues = function () {
  this.getLeague = function(leagueName, callback){
    redisClient.get('league:' + leagueName, function (err, data){
      if (err) console.log(err);
      var league;
      if (data){
        league = JSON.parse(data);
      } else {
        league = {name : leagueName};
      }
      callback(err, new model.League(league));
    });
  }

  this.addTeam = function (leagueName, team, callback) {
    var save = this.saveLeague;
    this.getLeague(leagueName, function (err, data){
      if (err) console.log(err);
      data.addTeam(team);
      save(data);
      callback(null, data);
    });
  }

  this.addPlayerToCurrentTeam = function (leagueName, player, callback) {
    var save = this.saveLeague;
    this.getLeague(leagueName, function (err, data){
      if (err) console.log(err);
      data.addPlayerToCurrentTeam(player);
      save(data);
      callback(null, data);
    });
  }

  this.saveLeague = function (league, callback) {
    assert(league.name, "league needs a name");
    redisClient.set('league:' + league.name, JSON.stringify(league), callback);
  }

  this.deleteLeague = function(leagueName, callback){
    redisClient.del('league:' + leagueName, callback);
  }
}

module.exports = leagues;
