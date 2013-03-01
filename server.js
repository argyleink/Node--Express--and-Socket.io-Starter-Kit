var   http    = require('http')
    , fs      = require('fs')
    , path    = require('path')
    , io      = require('socket.io').listen(1337);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

// CREATE SERVER //
http.createServer(function(request, response) {

    if (request.headers['content-type'] == 'text/json') 
        serveRequest(request, response);    
    else 
        serveStaticFile(request, response);

}).listen(1337, "0.0.0.0");
console.log('server is =)');

// FILE SERVER //
var serveStaticFile = function(request, response) {
    var filePath = '.' + request.url;
    if (filePath == './') filePath = './index.html';


    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
    }

    console.log('serving ' + filePath + ", content type: " + contentType);

    path.exists(filePath, function(exists) {

        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
};

// SERVICES //
var serveRequest = function(req, res) {
    console.log('data request: ' + req.url);

    if (req.url == '/nerd') {
        console.log('nerd works');
    }
};