var request = require('sync-request');

var getBodyForRequest = function (url){
	console.log('sending request to ' + url);
	var response = request('GET', url)
	return response.getBody('utf8');
}

module.exports = {getBodyForRequest: getBodyForRequest}