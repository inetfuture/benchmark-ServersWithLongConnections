var net = require('net');
var async = require('async');

var c = require('./config');

function Client() {
    this.socket = null;
}

Client.prototype.connect = function (options, connected, disconnected) {
    var self = this;
    self.socket = net.connect(options, function () {
        connected();
        self.socket.write('GET / HTTP/1.1\r\n\r\n');

        self.socket.on('close', function (had_error) {
            if (had_error) {
                console.log('close had error');
            }

            disconnected();
        });
    });

    self.socket.on('error', function (err) {
        console.log('error:', err);
    });
};

var stats = {
    connecting: 0,
    connected: 0
};

var q = async.queue(function (client, next) {
    client.connect({
        port: c.client.port,
        host: c.client.host
    }, function () {
        stats.connected++;
        next();
    }, function () {
        stats.connected--;
    });
}, 100);

for (var i = 0; i < 30000; i++) {
    q.push(new Client);
}

setInterval(function () {
    stats.connecting = q.length();
    console.log(stats);
}, 1000);