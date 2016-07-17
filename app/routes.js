var model = require('./model');

var routes = function (app) {
  app.get('/api/teams', function (req, res) {
    res.json(model.team.getTeams());
  });

  app.post('/api/teams', function(req, res) {
    var teamName = req.body.teamName;
    var teamOwner = req.body.teamOwner;
    model.team.addTeam({name: teamName, owner: teamOwner});

    res.json(model.team.getTeams());
  });

  app.delete('/api/teams/:team_id', function(req, res) {
    res.send('not yet implemented');
  });

  app.get('*', function(req, res) {
  	res.render('index');
  });
}

module.exports = routes;
