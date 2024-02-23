

var http = require('http');
var dt = require('./myFirstmodule');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type' : 'text/html'});
    res.write("Right Now the time is : " + dt.myDateTime());
    res.end();
}).listen(5000);

console.log("Server Up and Running....")