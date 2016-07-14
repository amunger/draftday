var assert = require('assert');
var Scraper = require('../scraper/scraper');
var httpTool = require('../scraper/httpTool');
var sinon = require('sinon');

var url = 'foot.ball';

describe('Scraping player data', function(){
	var urlBuilder = {build : function (offset) {return url + '?offset=' + offset}};
	
	describe('when retreiving nothing from the http request', function(){
		var urlsCalled = [];
		var httpStub = sinon.stub(httpTool, "getBodyForRequest", function (url) { urlsCalled.push(url)});
		
		var scraper = new Scraper({urlBuilder : urlBuilder, httpTool : httpTool});
		var playerData = scraper.getPlayerData();
		
		it('should make only one request to the URL',function(){
			assert.equal(urlsCalled.length, 1);
		});
		
		it('should build an empty list of retreived data', function () {
			assert.equal(playerData.length,0);
		});
	});
	
	describe('when retreiving a populated response', function() {
		it('should call for next set of data', function() {
			
		});
	});
	
});