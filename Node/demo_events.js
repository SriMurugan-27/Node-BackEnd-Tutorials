
var events = require('events');
var EventEmitter = new events.EventEmitter();

var eventHandler = function() {
    console.log('I hear a Scream!')
}

EventEmitter.on('Scream!',eventHandler);

EventEmitter.emit('Scream!')