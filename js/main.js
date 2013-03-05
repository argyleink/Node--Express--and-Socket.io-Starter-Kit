(function(){

	var socket 	= io.connect('http://localhost')
	  , title 	= document.querySelector('h1');

	socket.on('server event', function (data) {
		title.innerText = data.text;

		socket.emit('client event', { text: 'client side events are working' });
	});

})();