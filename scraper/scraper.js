var assert = require('assert');


var scraper = function (options){
	assert(options.httpTool);
	assert(options.urlBuilder);
	
	var httpTool = options.httpTool;
	var urlBuilder = options.urlBuilder;
	
	this.getPlayerData = function() {
		httpTool.getBodyForRequest('');
		
		return [];
	};
};

module.exports = scraper;