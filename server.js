var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var app = express();
var config = require("./app.json");

app.configure(function () {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.bodyParser());
    app.use(express.logger("short"));
});

for (var route in config.routes) {
	(function (route) {
		var path = config.pages[config.routes[route]];
		console.log(">>>", route);
		
		if (!config.pages[config.routes[route]].hasParams) {
			app.get(route, function (req, res) {
				res.writeHead(200, "content-type: text/html");

				var file = fs.createReadStream(path.html);
				file.pipe(res);			
			});
		} else {
			app.get(route + "/:id", function (req, res){
				res.writeHead(200, "content-type: text/html");
				
				console.log('da');
			});
		}
	})(route);
}

app.get("*", function (req, res) {
	res.writeHead(200, "content-type: text/html");
	
	var file = fs.createReadStream(config.pages.not_found.html);
	file.pipe(res);
});

app.listen(7777);
