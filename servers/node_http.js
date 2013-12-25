var http = require('http');

var c = require('../config')

var stats = {
    connected: 0
}

var server = http.createServer(function (req, res) {
    stats.connected++;

    res.on('close', function () {
        stats.connected--;
    });
});

server.listen(c.server.port);

setInterval(function () {
    console.log(stats);
}, 1000);