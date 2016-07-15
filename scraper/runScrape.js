var httpTool = require('./httpTool');
var urlBuilder = require('./urlBuilder');


console.log('scraping')

var html = httpTool.getBodyForRequest('http://localhost:3001');

console.log(html);