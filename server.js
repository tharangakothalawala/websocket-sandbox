/**
 * @author : Tharanga Kothalawala <tharanga.kothalawala@tsk-webdevelopment.com>
 * @date   : 17-01-2017
 */

/*
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
//*/
/*
var http = require('http');
var server = http.createServer(function(request, response) {});

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

var WebSocketServer = require('websocket').server;
var wsServer = new WebSocketServer({
    httpServer: server
});


wsServer.on('request', function(r){
    var connection = r.accept('tskp', r.origin);
    var count = 0;
    var clients = {};

    var id = count++;
    clients[id] = connection

    console.log((new Date()) + ' Connection accepted [' + id + ']');
     
    connection.on('message', function(message) {
        var msgString = message.utf8Data;

        for(var i in clients){
            clients[i].sendUTF("changed within the server : " + msgString);
        }

    }); 

    connection.on('close', function(reasonCode, description) {
        delete clients[id];
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});
//*/


var request = require('request');
var WSS = require('ws').Server;
var wss = new WSS({ port: 8080 });

wss.on('connection', function(socket) {
    console.log('wss.on:connection ');

    var json = JSON.stringify({ message: 'connection is started! Pending stat!!' });
    socket.send(json);

    socket.on('message', function(message) {
        console.log('socket.on:message - server ack: ' + message);
    });

    socket.on('close', function() {
        console.log('socket.on:close ');
    });
});


var TskSystemStat = function() {
    var json = JSON.stringify({
        message: (new Date()) + ' - server'
    });

    var url = "http://dev-vm-05/websockets/TskSystemStat.php";
    request(url, function(err, res, body) {
        response = res.body;

        if (response.hasOwnProperty('success') && response['success'] === false ) {
            if (response.hasOwnProperty('message')) {
                console.log(response['message']);
            }
        } else {
            wss.clients.forEach(function each(client) {
                client.send(response);
                console.log('Sent: ' + response);
            });
        }
    });
  

}

setInterval(TskSystemStat, 3000);
