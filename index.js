var express = require('express');
var server = express();

var options = {
    index: 'dist/index.html'
};

server.use('/', express.static('/home/site/wwwroot', options));
