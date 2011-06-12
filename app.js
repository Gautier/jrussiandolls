require.paths.unshift('./node_modules');

var bee = require('beeline'),
    url = require('url'),
    data = require('./data'),
    http = require('http');

var allowedMimeTypes = {".html": "text/html",
                        ".css": "text/css",
                        ".png": "image/png",
                        ".gif": "image/gif",
                        ".js": "text/javascript"};


var router = bee.route({ 
  "/buildings.json": function (req, res) {
    var query = url.parse(req.url, parseQueryString=true).query;
    res.writeHead(200, {'Content-Type': 'application/json'}); 
    res.end(JSON.stringify(data.buildings));
  },

  "/rooms.json": function (req, res) {
    var query = url.parse(req.url, parseQueryString=true).query;
    res.writeHead(200, {'Content-Type': 'application/json'}); 
    var building = data.getBuildingById(data.buildings, query["id"]);
    res.end(JSON.stringify(building.rooms));
  },

  "/cupboards.json": function (req, res) {
    var query = url.parse(req.url, parseQueryString=true).query;
    res.writeHead(200, {'Content-Type': 'application/json'}); 
    var room = data.getRoomById(data.buildings, query["id"]);
    res.end(JSON.stringify(room.cupboards));
  },

  "/": bee.staticFile("./docs/index.html", "text/html"),

  "r`^/static/(.*)$`": bee.staticDir("./docs/static/",  allowedMimeTypes),
  "r`^/facebox/(.*)$`": bee.staticDir("./docs/static/",  allowedMimeTypes),
  "r`^/src/(.*)$`": bee.staticDir("./src/",  allowedMimeTypes),

  "r`^/(.*)$`": bee.staticDir("./docs/",  allowedMimeTypes)
});

http.createServer(router).listen(process.env.VMC_APP_PORT || 8000);
