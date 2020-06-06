// const EventEmitter = require('events');
// const emitter = new EventEmitter();
const Logger = require('./logger');
const logger = new Logger();
const http = require('http');

const server = http.createServer((req,res) => {
    if(req.url = '/') {
        res.write('Hello World');
        res.end();
    }
});

server.listen(3000);
console.log("listening on port 3000......chklo");



// logger.on('sendMessage',(args) => {
//     console.log('event listened: ',args);
// });

// logger.log();

// emitter.emit('logging',"logging results");