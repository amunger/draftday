var cheerio = require('cheerio');

var parseHtmlForPlayers = function (html){
	var $ = cheerio.load(html);
	var players = [];
	
	$('tr').each(function(i, elem){
		var name = $(this).find('a.playerName').text();
		if (name){
			var teamAndPostion = getTeamAndPosition($(this));
			var player = {
				name: name,
				position: teamAndPostion[0].trim(),
				team: teamAndPostion[1].trim(),
				rank: $(this).find('td.playerDraftAvgPick').text()
			};
			players.push(player);
		}
	});
	console.log('players parsed: ' + players.length)
	return players;
}

var getTeamAndPosition = function(el){
	var text = el.find('em').text();
	if (text.indexOf('-') === -1)
	{
		return [text, ''];
	}
	return text.split('-');
}


module.exports = {parseHtmlForPlayers: parseHtmlForPlayers}