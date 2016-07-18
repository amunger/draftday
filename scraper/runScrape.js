var httpTool = require('./httpTool');
var urlBuilder = require('./urlBuilder');
var Scraper = require('./scraper');


console.log('scraping')

var scraper = new Scraper({httpTool: httpTool, urlBuilder: urlBuilder});
scraper.getPlayerData(5);

//var output = httpTool.getBodyForRequest('http://fantasy.nfl.com/draftcenter/breakdown?leagueId=&offset=1&position=all&season=2016&sort=draftAveragePosition');
