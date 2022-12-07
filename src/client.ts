import 'reflect-metadata'
import path from 'path'
import { Intents, Interaction, Message } from 'discord.js'
import { Client } from 'discordx'
import * as dotenv from 'dotenv'
import { configService } from './config/env.config'

// Initialisation
//--------------------------------------------------------------------------
dotenv.config()
configService.start()

// Client creation
//--------------------------------------------------------------------------
const client = new Client({
	prefix: '!',
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
	classes: [path.join(__dirname, 'commands', '**/*.{ts,js}'), path.join(__dirname, 'events', '**/*.{ts,js}')],
	botGuilds: [configService.get('GUILD_ID')],
	silent: true,
})

// Events
//--------------------------------------------------------------------------
client.once('ready', async () => {
	await client.initApplicationCommands({
		guild: { log: true },
		global: { log: true },
	})
	await client.initApplicationPermissions()
	console.log('Bot is ready!')
})

client.on('interactionCreate', (interaction: Interaction) => {
	void client.executeInteraction(interaction)
})

client.on('messageCreate', (message: Message) => {
	void client.executeCommand(message)
})

void client.login(process.env.BOT_TOKEN as string)
