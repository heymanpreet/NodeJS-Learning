const EventEmitter = require('events');

class Logger extends EventEmitter {
     log() {
        this.emit('sendMessage',"hey app JS, please listen to me");
    }
}

module.exports = Logger;