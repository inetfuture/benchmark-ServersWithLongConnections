var net = require('net');

var client = net.connect({ port: 6666, host: 'localhost' }, function () {
  console.log('Connected');
});

client.on('data', function (chunk) {
  console.log(chunk.toString());
});