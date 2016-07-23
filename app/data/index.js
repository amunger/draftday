'use strict'
var players = require('./players');
var leagues = require('./leagues');


module.exports = {
	players: new players(),
	leagues: new leagues()
};
