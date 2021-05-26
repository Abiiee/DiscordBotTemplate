const { Client, Intents } = require('discord.js-light')
const Commands = require('./Commands')
const Events = require('./Events')
module.exports = class Bot extends Client {
    constructor() {
        super({
            /* Intents necesarios por ustedes por defecto por defecto servidores y mensajes de servidores. */
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
            /* Las siguientes lineas deben activarlas o desactivarlas depende de lo que necesiten */
            cacheRoles: true,
            cacheGuilds: true,
            cacheEmojis: false,
            cacheMembers: true,
            cacheChannels: true,
            cachePresences: false,
            cacheOverwrites: true,
            messageCacheMaxSize: 20,
        })
        this.events = new Events(this)
        this.events.load()
        this.commands = new Commands(this)
        this.commands.load()
        this.devs = process.env.DEVS ? process.env.DEVS.split(', ') : [];
        this.login(process.env.BOT_TOKEN)
    }
}