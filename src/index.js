require('dotenv').config()
const { ShardingManager } = require('discord.js-light')
const path = require('path')

const shards = new ShardingManager(path.join(__dirname, 'bot.js'), {
    token: process.env.BOT_TOKEN
})

shards.spawn()