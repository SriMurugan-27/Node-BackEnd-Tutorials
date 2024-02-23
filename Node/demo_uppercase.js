// import { upperCase } from 'upper-case';

var http = require('http');
// var uc = require('upper-case');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write("uppercase".toUpperCase()); // Use uc directly, not uc.upperCase
    res.end();
}).listen(5000);

console.log('Uppercase Server running...');
