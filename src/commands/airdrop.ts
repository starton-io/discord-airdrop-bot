import { CommandInteraction } from 'discord.js'
import { Discord, Slash, SlashOption } from 'discordx'
import db from 'quick.db'
import axios from 'axios'
import moment from 'moment'
import { configService } from '../config/env.config'
import { StartonApi } from '../config/api.config'

/*
|--------------------------------------------------------------------------
| Contract
|--------------------------------------------------------------------------
*/
interface SmartContractCallResponse {
	data: {
		transactionHash: string
	}
}

interface User {
	date: number
}

const channelId = configService.get('CHANNEL_ID')

/*
|--------------------------------------------------------------------------
| Command
|--------------------------------------------------------------------------
*/
@Discord()
export abstract class Airdrop {
	@Slash('airdrop')
	private async airdrop(
		@SlashOption('address', { required: true }) address: string,
		interaction: CommandInteraction,
	) {
		// Check channel
		//--------------------------------------------------------------------------
		if (channelId && interaction.channelId !== channelId) {
			return await interaction.reply({
				content: `You are on the wrong channel :octagonal_sign: Please go to the channel <#${channelId}>`,
				ephemeral: true,
			})
		}

		// Check user input
		//--------------------------------------------------------------------------
		const validAddresses = address ? address.match(/0x[a-fA-F0-9]{40}/) : null
		if (!validAddresses) {
			return await interaction.reply({
				content: 'You must include a valid address :white_check_mark:\nCreate a wallet: https://metamask.io/',
				ephemeral: true,
			})
		}

		// Check if user exists and if it has already played in the last 24 hours
		//--------------------------------------------------------------------------
		const found: User = await db.get(interaction.user.id)
		const oneDay = 60 * 60 * 24 * 1000
		if (found && found.date + oneDay >= Date.now()) {
			const now = moment()
			const canReplay = moment(found.date).add(oneDay)
			const hours = canReplay.diff(now, 'hour')
			const minutes = canReplay.subtract(hours, 'hours').diff(now, 'minute')
			const seconds = canReplay.subtract(minutes, 'minutes').diff(now, 'seconds')
			await interaction.reply({
				content: `Too early, please wait ${hours} hours, ${minutes} minutes and ${seconds} seconds`,
				ephemeral: true,
			})
			return
		}

		// Here we call deferReply to notify Discord that the request might take some time
		// More infos: https://discordjs.guide/slash-commands/response-methods.html#deferred-responses
		//--------------------------------------------------------------------------
		await interaction.deferReply()

		// Add the user in database
		//--------------------------------------------------------------------------
		await db.set(interaction.user.id, { date: Date.now() })

		// Check if the user lost
		//--------------------------------------------------------------------------
		const rand = Math.random() * 100
		if (rand < 90) {
			return await interaction.editReply(
				`Sorry <@${interaction.user.id}> you didn't win :cry: But don't worry, you can try again once every 24 hours!`,
			)
		}

		// Here user won:
		// Call Starton API to mint token on its address
		//--------------------------------------------------------------------------
		try {
			const tx: SmartContractCallResponse = await StartonApi.post(
				`/smart-contract/${configService.get('STARTON_SMART_CONTRACT_NETWORK')}/${configService.get(
					'STARTON_SMART_CONTRACT_ADDRESS',
				)}/call`,
				{
					functionName: 'mint',
					signerWallet: configService.get('STARTON_WALLET'),
					params: [address, '3000000000000000000000'],
				},
			)
			await interaction.editReply(
				`Congratulations <@${interaction.user.id}> you WIN :rocket: :partying_face: :gift: ${
					configService.get('NETWORK_EXPLORER_TX_ROUTE') + tx.data.transactionHash
				}\n\nThis transaction was powered by https://starton.io`,
			)
			await db.set(interaction.user.id, { hash: tx.data.transactionHash, date: Date.now() })
		} catch (error) {
			if (axios.isAxiosError(error)) console.log(error.response?.data)
			db.delete(interaction.user.id)
			await interaction.editReply('An error occurred, please wait a few minutes and retry again.')
		}
	}
}
