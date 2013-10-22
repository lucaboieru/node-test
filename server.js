var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var app = express();

app.configure(function () {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.bodyParser());
    app.use(express.logger("short"));
});

var config;

fs.readFile("app.json", "utf8", function (err, data) {
	if (err) { return; }
	
	config = JSON.parse(data);
});

app.use(function (req, res) {
	
	var url = req.url;
	var route = "";	

	for (var i in config.routes) {
		console.log(">>>" + config.routes[i]);
		if (i === url) { route = config.pages[config.routes[i]]; break; } 
	}

	if (route === "") { route = config.pages.not_found; } 

	res.writeHead(200, "content-type: text/html");

	var file = fs.createReadStream(route.html);

	file.pipe(res);
});

http.createServer(app).listen(7777);
