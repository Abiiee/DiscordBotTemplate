const { Collection } = require('discord.js-light')
const Command = require('../structures/Command')
const { readdirSync, statSync } = require('fs')
const { join } = require('path')

module.exports = class Commands extends Collection {
    constructor(client) {
        super();
        this.client = client
    }

    load() {
        const folder = join(__dirname, '../commands/');
        const categories = readdirSync(folder).filter(f => statSync(join(folder, f)).isDirectory());
        for (const category of categories) {
            const commands = readdirSync(join(folder, category)).filter(x => x.endsWith('.js'));
            for (const command of commands) {
                const commandFile = require(join(folder, category, command));
                const commandClass = new commandFile(this.client);
                commandClass.category = category
                this.set(commandClass.name, commandClass);
            }
        }
    }

    /**
     * Obten algún comando mediante el name o alias
     * @param {string} name - name o alias del comando
     * @returns {?Command} - El comando en caso de encontrar uno.
     */
    get(name) {
        return this.find((c) => c.name === name || c.aliases.includes(name));
    }
}
