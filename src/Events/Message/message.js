const Events = require('../../structures/Event')

module.exports = class Message extends Events {
    constructor(client) {
        super(client, {
            name: 'message'
        })
    }

    async run(message) {
        let prefix = process.env.BOT_PREFIX || '!';
        if (!message.author) return;

        const prefixes = [prefix, `<@${this.client.user.id}>`, `<@!${this.client.user.id}>`];

        const usedPrefix = prefixes.find((p) => message.content.startsWith(p));
        if (!usedPrefix || message.author.bot) return;
        if (usedPrefix !== prefix)
            message.mentions.users.delete(message.mentions.users.first().id);

        const args = message.content.slice(usedPrefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = this.client.commands.find(c => c.name === command || c.aliases.includes(command));
        if (!cmd) return;
        try {
            if (!cmd.canRun(message)) return;
            cmd.run(message, args);
        } catch (e) {
            console.log(e.stack || e);
            message.channel.send(`Un error a ocurrido: ${e.message || e}`);
        }
    }
}