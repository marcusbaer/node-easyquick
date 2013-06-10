var argv = require('optimist').argv;
var fs = require('fs');
var sys = require('util');
var _ = require('underscore');
var data = require('./data');
var childProcess = require('child_process');

var port = argv.p || '80';
var wwwDir = argv.www || __dirname;

var myList = data.myList;

var templates = {};

//loadTemplate('./tpl/one.scss', function(tpl){
//    templates.one = tpl;
//});

var callService = function (serviceName, postData, callback) {
    var responseData = {};
    switch (serviceName) {
    }
    if (callback) {
        callback(responseData);
    }
};

var service = function (req, res, postData) {
    callService(req.url.replace(/\/service\//,''), JSON.parse(postData), function(responseData){
        res.writeHead(200, { 'content-type': 'application/json' });
        res.write(JSON.stringify(responseData));
        res.end();
    });
};

var static = function (req, res) {

    var filename;
    filename = (req.url === "/") ? wwwDir + "/index.html" : wwwDir + req.url;

    var u = filename.split('.');
    var ext = u.pop();

    var contentType = 'text/plain';

    switch (ext) {
        case "html":
            contentType = 'text/html';
            break;
        case "css":
        case "less":
            contentType = 'text/css';
            break;
        case "js":
            contentType = 'text/javascript';
            break;
        case "tsv":
        case "csv":
            contentType = 'text/comma-separated-values';
            break;
        case "ico":
            contentType = 'image/x-ico';
            break;
        case "png":
            contentType = 'image/png';
            break;
        case "jpg":
            contentType = 'image/jpeg';
            break;
    }

    if ( contentType.indexOf('image') >= 0 ) {
        res.writeHead(200, { 'content-type': contentType });
        fs.readFile(filename, function (err, data) {
            if (err) throw err;
            res.write(data);
            res.end();
        });
    } else {
        res.writeHead(200, { 'content-type': contentType });
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) throw err;
            res.write(data+"\n");
            res.end();
        });
    }

};

exports.static = static;
exports.service = service;

function loadTemplate (filename, callback) {
    fs.readFile(filename, 'utf8', function(err, data) {
        if(err) throw err;
        callback(data);
    });
}

function encode (txt) {
    return new Buffer(txt).toString('base64');
}

function decode (txt) {
    return new Buffer(txt, 'base64').toString('utf8');
}

function ls (options, callback) {
    var compiler = childProcess.exec('ls', function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
//		console.log('Child Process STDOUT: '+stdout);
//		console.log('Child Process STDERR: '+stderr);
    });

    compiler.on('exit', function (code) {
//		sys.log('Child process exited with exit code '+code);
        if (callback) {
            callback();
        }
    });
}