const Events = require('../../structures/Event')

module.exports = class Ready extends Events {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }
    run() {
        console.log(`Sesión iniciada como: ${this.client.user.tag}`)
    }
}