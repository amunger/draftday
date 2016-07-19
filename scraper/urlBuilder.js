
var baseUrl = 'http://fantasy.nfl.com/draftcenter/breakdown?leagueId=&offset={{offset}}&position=all&season=2016&sort=draftAveragePosition';

var build = function(offset){
	var result = baseUrl.replace('{{offset}}', offset);
	return result;
}

module.exports = {build: build};