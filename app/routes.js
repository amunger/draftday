'use strict'
var model = require('./model');
var data = require('./dataAccess');

var routes = function (app) {
  app.get('/api/teams', function (req, res) {
    res.json(data.teams.getAll());
  });

  app.get('/api/players', function (req, res) {
    res.json(data.players.getAll());
  });

  app.get('/api/selectPlayer/:playerID', function (req, res) {
    var player = data.players.getByID(req.params.playerID);

    data.teams.addPlayerToCurrentTeam(player);
    res.json(data.teams.getAll());
  });

  app.post('/api/teams', function(req, res) {
    var teamName = req.body.teamName;
    var teamOwner = req.body.teamOwner;
    data.teams.addTeam({name: teamName, owner: teamOwner});

    res.json(data.teams.getAll());
  });

  app.delete('/api/teams/:teamID', function(req, res) {
    res.send('not yet implemented');
  });

  app.get('*', function(req, res) {
  	res.render('index');
  });
}

module.exports = routes;
