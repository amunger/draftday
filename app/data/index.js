'use strict'
var players = require('./players');
var leagues = require('./leagues');
var chatHistory = require('./chatHistory');


module.exports = {
	players: new players(),
	leagues: new leagues(),
	chat: new chatHistory()
};
