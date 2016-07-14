var assert = require('assert');
var Scraper = require('../scraper/scraper');
var httpTool = require('../scraper/httpTool');
var sinon = require('sinon');

var url = 'foot.ball';

describe('Scraping player data', function(){
	var urlBuilder = {build : function (offset) {return url + '?offset=' + offset}};
	
	describe('when retreiving nothing from the http request', function(){
		var urlsCalled = [];
		var httpStub = sinon.stub(httpTool, "getBodyForRequest", function (url) { urlsCalled.push(url); return ''});
		
		var scraper = new Scraper({urlBuilder : urlBuilder, httpTool : httpTool});
		var playerData = scraper.getPlayerData();
		httpStub.restore();
		
		it('should make only one request to the URL',function(){
			assert.equal(urlsCalled.length, 1, 'http tools should make one and only one request');
			assert(urlsCalled[0].indexOf(url) > -1, 'the URL called with Http tools does not look valid');
		});
		
		it('should build an empty list of retreived data', function () {
			assert.equal(playerData.length,0);
		});
	});
	
	describe('when retreiving a populated response', function() {
		var urlsCalled = [];
		var returnTimes = 3;
		
		var httpStub = sinon.stub(httpTool, "getBodyForRequest", function (url) { 
			urlsCalled.push(url);
			if (returnTimes--) return 'val1,val2,val3'; else return '';
		});
		
		var scraper = new Scraper({urlBuilder : urlBuilder, httpTool : httpTool});
		var playerData = scraper.getPlayerData();
		httpStub.restore();
		
		it('should call for next set of data', function() {
			assert(urlsCalled.length > 1, 'http tools should make multiple calls for full data');
			assert(urlsCalled[0] != urlsCalled[1], 'each URL called should be different')
		});
		
		it('should return an array of the data retreived', function(){
			assert(playerData.length > 1, 'The scraper did not return enough data');
		});
		
	});
	
});