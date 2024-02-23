
var url = require('url');
var adr = 'http://localhost:5000/default.htm?year=2003&month=april';
var q = url.parse(adr, true)

console.log(q.host)     
console.log(q.pathname)
console.log(q.search)

var qdata = q.query;
console.log(qdata.month);