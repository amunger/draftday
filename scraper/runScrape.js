var httpTool = require('./httpTool');
var urlBuilder = require('./urlBuilder');
var Scraper = require('./scraper');


console.log('scraping')

var scraper = new Scraper({httpTool: httpTool, urlBuilder: urlBuilder});
scraper.getPlayerData(5);

