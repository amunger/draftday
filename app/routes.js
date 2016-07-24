'use strict'
var model = require('./model');
var data = require('./data');

var routes = function (app) {
  app.get('/api/teams/:league', function (req, res) {
    data.leagues.getLeague(req.params.league, function(err, data){
      res.json(data.teams);
    });
  });

  app.get('/api/players', function (req, res) {
    res.json(data.players.getAll());
  });

  app.get('/api/selectPlayer/:league/:playerID', function (req, res) {
    var player = data.players.getByID(req.params.playerID);
    var league = req.params.league;
    data.leagues.addPlayerToCurrentTeam(league, player, function (err, data){
      res.json(data.teams);
    });
  });

  app.get('/api/undoLastPick/:league', function(req, res){
    var league = req.params.league;
    data.leagues.undoLastPick(league, function (err, data){
      res.json(data.teams);
    });
  });

  app.post('/api/team/:league', function(req, res) {
    var league = req.params.league;
    var teamName = req.body.teamName;
    var teamOwner = req.body.teamOwner;
    data.leagues.addTeam(league,
      {name: teamName, owner: teamOwner},
      function (err, data){
        res.json(data.teams);
      });
  });

  app.delete('/api/team/:teamID', function(req, res) {
    res.send('not yet implemented');
  });

  app.get('*', function(req, res) {
    console.error('unknown path hit')
  	res.send('');
  });
}

module.exports = routes;
