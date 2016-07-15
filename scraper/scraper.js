var assert = require('assert');
var fs = require('fs');

var scraper = function (options){
	assert(options.httpTool);
	assert(options.urlBuilder);
	
	var httpTool = options.httpTool;
	var urlBuilder = options.urlBuilder;
	
	this.getPlayerData = function() {
		var pages = [];
		var offset = 1;
		var data = httpTool.getBodyForRequest(urlBuilder.build(offset));
		saveRawOutput(data, offset);
		while(data && offset < 2000){
			offset = offset + 25;
			pages.push(data);
			data = httpTool.getBodyForRequest(urlBuilder.build(offset));
			saveRawOutput(data, offset);
		}
		
		return pages;
	};
	
};

module.exports = scraper;



var saveRawOutput = function(data, offset){
	var rawOutputDir = './output/raw/page';
	fs.writeFileSync(rawOutputDir + offset + '.txt', data)
}