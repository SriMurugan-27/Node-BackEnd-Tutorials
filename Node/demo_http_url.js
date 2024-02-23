
var http = require('http');

http.createServer(function( req,res) {
    res.writeHead(200, { 'Content-Type' : 'text/html'});
    res.write(req.url);
    res.end(`  -  Alter the http://localhost:5050/CHANGE_URL_HERE`)
}).listen(5000);

console.log('Server Url Request Up & Runnning...')