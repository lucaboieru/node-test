var http = require('http');
var fs = require('fs');

var config;

fs.readFile("app.json", "utf8", function (err, data) {
	if (err) { return; }
	
	config = JSON.parse(data);
});

var server = http.createServer(function (req, res) {
	
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

server.listen(7777);
