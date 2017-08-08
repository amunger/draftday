'use strict'
var model = require('../model');
var data = require('../data');

var routes = function (app) {
  app.get('/api/teams/:league', function (req, res) {
    data.leagues.getLeague(req.params.league, function(err, data){
      res.json({teams: data.teams, currentPick: data.currentPick});
    });
  });

  app.get('/api/players', function (req, res) {
    res.json(data.players.getAll());
  });

  app.get('/api/users/:league', function (req, res){
    var users = data.chat.getUsers(req.params.league);
    res.json(users);
  });

  app.get('/api/messages/:league', function (req, res){
    var messages = data.chat.getMessages(req.params.league);
    res.json(messages);
  });

  app.get('/api/selectPlayer/:league/:playerID', function (req, res) {
    var player = data.players.getByID(req.params.playerID);
    var league = req.params.league;
    data.leagues.addPlayerToCurrentTeam(league, player, function (err, data){
      res.json({teams:data.teams, currentPick: data.currentPick});
    });
  });

  app.post('/api/selectPlayerCustom/:league/', function (req, res) {
    console.log(req.body);
    var player = new model.Player({name: req.body.playerName, position: req.body.position, team: req.body.team});
    var league = req.params.league;
    data.leagues.addPlayerToCurrentTeam(league, player, function (err, data){
      res.json({teams:data.teams, currentPick: data.currentPick});
    });
  });

  app.get('/api/undoLastPick/:league', function(req, res){
    var league = req.params.league;
    data.leagues.undoLastPick(league, function (err, data){
      res.json({teams:data.teams, currentPick: data.currentPick});
    });
  });

  app.post('/api/team/:league', function(req, res) {
    var league = req.params.league;
    var teamName = req.body.teamName;
    var teamOwner = req.body.teamOwner;
    var teamID = req.body.teamID;

    console.log(req.body);

    if (teamID){
      data.leagues.updateTeam(league,
        {id: teamID, name: teamName, owner: teamOwner},
        req.body.position,
        function (err, data){
          res.json(data);
        });
    }
    else{
      data.leagues.addTeam(league,
        {name: teamName, owner: teamOwner},
        function (err, data){
          res.json(data);
        });
    }
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
