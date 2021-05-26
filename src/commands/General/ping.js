const Commands = require('../../structures/Command');

module.exports = class Ping extends Commands {
    constructor(client) {
        super(client, {
            name: 'ping'
        });
    }

    async run(msg) {
        return msg.channel.send(`Pong! ${this.client.ws.ping}ms.`);
    }
};