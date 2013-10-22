var expr = require('express');
var fs = require('fs');

var app = expr();
var config;

fs.readFile("appconfig.json", "utf8", function (err, data) {
	if (err) { return; }
	
	config = JSON.parse(data);
});

app.get("/", function (req, res) {
	
	console.log(config);

});

app.listen(7777);
