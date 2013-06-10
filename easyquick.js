var argv = require('optimist').argv;
var http = require('http');
var tools = require('./tools');

var s = http.createServer(function(req, res) {

    var body = "";
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        if (req.url.indexOf('/service/') == 0) {
            tools.service(req, res, body);
        } else {
            tools.static(req, res);
        }
    });

});

s.listen(argv.p || 80);