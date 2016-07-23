'use strict'
var assert = require('assert');
var leagues = require('../app/data').leagues;

describe('getting a league that doesn\'t exist', function (){
  var league;
  before(function (done) {
    leagues.getLeague('TestLeague', function(err, data){
      if (err) console.log(err);
      league = data;
      console.log('got league ' + JSON.stringify(data));
      done();
    });
  });

  after(function (done) {
    leagues.deleteLeague('TestLeague', function(err, data){
      if (err) console.log(err);
      league = data;
      done();
    });
  });

  it('should have the league name set', function (){
    assert.equal('TestLeague', league.name);
  });

  describe('saving league with new data', function(){

    var testTeams = [{name: 'team1'}, {name: 'team2'}];
    before (function (done) {
      assert(league.teams.length == 0, 'league already has test data, clean up needed');
      league.teams = testTeams;
      leagues.saveLeague(league, function (err) {
        if (err) console.log(err);
        done();
      });
    });

    it('retrieved league should have new data', function (done){
      leagues.getLeague('TestLeague', function(err, data){
        if (err) console.log(err);
        assert.equal(testTeams[0].name, data.teams[0].name);
        assert.equal(testTeams[1].name, data.teams[1].name);
        done();
      });
    });
  });

});
