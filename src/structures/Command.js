const { Message, Collection } = require('discord.js-light')

module.exports = class Command { 
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.aliases = options.aliases || []
        this.botPerms = {
            guild: options.botPerms?.guild || [],
            channel: options.botPerms?.channel || []
        }
        this.memberPerms = {
            guild: options.memberPerms?.guild || [],
            channel: options.memberPerms?.channel || []
        }
        this.cooldown = options.cooldown || 2;
        this.enabled = typeof options.enabled === 'boolean' ? options.enabled : true;
        this.guildOnly = typeof options.guildOnly === 'boolean' ? options.guildOnly : this.category !== 'General';
        this.nsfwOnly = typeof options.nsfwOnly === 'boolean' ? options.nsfwOnly : false;
        this.devsOnly = typeof options.devsOnly === 'boolean' ? options.devsOnly : false;
        this.cooldowns = new Collection();
    }

    /**
     * Comprobar todos los "requisitos" para ejecutar el comando.
     * @param {Message} message - Mensaje recibido.
     * @returns {boolean} - Si cumple todos los requisitos.
     */
    canRun(message) {
        if (message.guild && !message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return false;
        if (this.devsOnly && !this.client.devs.includes(message.author.id)) return false;
        if (this.checkCooldowns(message)) return !message.channel.send(`Estas en cooldown, espera para poder ejecutar nuevamente el comando`);
        if (!this.enabled && !this.client.devs.includes(message.author.id)) return !message.channel.send('Este comando se encuentra en mantenimiento');
        if (this.guildOnly && !message.guild) return !message.channel.send('Este comando solo puede ejecutarse en servidores.');
        if (message.guild && !message.channel.nsfw && this.nsfwOnly) return !message.channel.send('Este comando solo puede ejecutarse en canales NSFW.');
        if (message.guild && this.memberPerms.guild[0] && !this.memberPerms.guild.every((x) => message.member.permissions.has(x)) && !this.client.devs.includes(message.author.id))
            return !message.channel.send(`Necesitas de los siguientes permisos \`${this.memberPerms.guild.map(this.parsePermission).join(', ')}\``);
        if (message.guild && this.memberPerms.channel[0] && !this.memberPerms.channel.every((x) => message.channel.permissionsFor(message.member).has(x)) && !this.client.devs.includes(message.author.id))
            return !message.channel.send(`Necesitas de los siguientes permisos en este canal: \`${this.this.memberPerms.channel.map(this.parsePermission).join(', ')}\``);
        if (message.guild && this.botPerms.guild[0] && !this.botPerms.guild.every((x) => message.guild.me.permissions.has(x)))
            return !message.channel.send(`Necesito de los siguientes permisos: \`${this.botPerms.guild.map(this.parsePermission).join(', ')}\``);
        if (message.guild && this.botPerms.channel[0] && !this.botPerms.channel.every((x) => message.channel.permissionsFor(message.guild.me).has(x)))
            return !message.channel.send(`Necesito de los siguientes permisos en este canal: \`${this.botPerms.channel.map(this.parsePermission).join(', ')}\``);
        return true;
    }

    /**
     * Comprueba si el author de un mensaje se encuentra en cooldown, y en caso de que no se encuentre agregarle uno
     * @param {Message} message - Mensaje recibido.
     * @returns {boolean} - Si esta en cooldown o no.
     */
    checkCooldowns(message) {
        if (this.cooldowns.has(message.author.id)) return true;
        this.cooldowns.set(message.author.id, Date.now() + (this.cooldown * 1000));
        setTimeout(() => {
            this.cooldowns.delete(message.author.id);
        }, this.cooldown * 1000);
        return false;
    }

    /**
     * Convertir el string en una forma más facil de leer.
     * @param {string} permission - El permiso en string.
     * @returns {string} - Permiso modificado.
     */
    parsePermission(permission) {
        return permission.toLowerCase()
            .replace(/_/g, ' ')
            .replace(/(?:^|\s)\S/g, (c) => c.toUpperCase());
    }
}