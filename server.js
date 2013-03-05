var express = require('express')
  , app     = express()
  , server  = require('http').createServer(app)
  , io      = require('socket.io').listen(server);

server.listen(8000);
app.use(express.static(__dirname + '/'));

io.sockets.on('connection', function (socket) {

	socket.emit('server event', { text: 'Socket.io works' });

	socket.on('client event', function (data) {
		console.log(data.text);
	});

});