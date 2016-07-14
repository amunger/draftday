var assert = require('assert');


var scraper = function (options){
	assert(options.httpTool);
	assert(options.urlBuilder);
	
	var httpTool = options.httpTool;
	var urlBuilder = options.urlBuilder;
	
	this.getPlayerData = function() {
		var pages = [];
		var offset = 1;
		var data = httpTool.getBodyForRequest(urlBuilder.build(offset));
		while(data && offset < 2000){
			pages.push(data);
			data = httpTool.getBodyForRequest(urlBuilder.build(offset+=25));
		}
		
		return pages;
	};
};

module.exports = scraper;