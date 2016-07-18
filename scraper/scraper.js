var assert = require('assert');
var fs = require('fs');

var scraper = function (options){
	assert(options.httpTool);
	assert(options.urlBuilder);
	
	var httpTool = options.httpTool;
	var urlBuilder = options.urlBuilder;
	
	this.getPlayerData = function(waitSeconds) {
		var pages = [];
		var offset = 1;
		var data = httpTool.getBodyForRequest(urlBuilder.build(offset));
		saveRawOutput(data, offset);
		pages.push(data);
		
		while(data && offset < 2000){
			sleep(waitSeconds || 5);
			offset = offset + 25;
			data = httpTool.getBodyForRequest(urlBuilder.build(offset));
			pages.push(data);
			saveRawOutput(data, offset);
		}
		
		return pages;
	};
	
};

module.exports = scraper;

var sleep = function(s) {
      var e = new Date().getTime() + (s * 1000);

      while (new Date().getTime() <= e) {
        ;
      }
}

var saveRawOutput = function(data, offset){
	var rawOutputDir = './output/raw/page';
	fs.writeFileSync(rawOutputDir + offset + '.txt', data)
}