import * as dotenv from 'dotenv'
import Bot from './Bot'
import { HelpCommand, RoleCommand, RolesCommand, CleanCommand } from './commands'
import { Client, TextChannel } from 'discord.js'
import { loggerId, roles } from './config'
import Logger from './utils/Logger'

dotenv.config()

const logger = new Logger()
const client = new Client()

// On cherche le channel "log"
client.on('ready', function () {
  let channel = client.channels.find('id', loggerId) as TextChannel
  if (channel) {
    logger.channel = channel
  }
})

const bot = new Bot(client, process.env.API_KEY)
bot.addCommand(new HelpCommand(bot.commands))
bot.addCommand(new RolesCommand(roles))
bot.addCommand(new RoleCommand(roles))
bot.addCommand(new CleanCommand(logger))
bot.connect()
  .catch(function (e) {
    console.error(e)
  })