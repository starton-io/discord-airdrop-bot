import axios from "axios"
import { CommandInteraction } from "discord.js"
import { Discord, Slash, SlashOption } from "discordx"
import moment from "moment"
import db from 'quick.db'

const starton = axios.create({
    baseURL: "https://api-connect.starton.io/v1",
    headers: {
        "x-api-key": process.env.STARTON_API_KEY,
    },
})
const channelId = process.env.CHANNEL_ID

@Discord()
abstract class Airdrop {

	@Slash("airdrop")
	private async airdrop(
		@SlashOption("address", { required: true}) address: string,
		interaction: CommandInteraction
	) {
		if (channelId && interaction.channelId !== channelId) {
			interaction.reply({
				content: `You are on the wrong channel :octagonal_sign: Please go to the channel <#${channelId}>`,
				ephemeral: true
			})
		} else {
			const validAddresses = address ? address.match(/0x[a-fA-F0-9]{40}/) : null
			if (!validAddresses) {
				interaction.reply({
					content: "You must include a valid address :white_check_mark:\nCreate a wallet: https://metamask.io/",
					ephemeral: true
				})
			} else {
				const found = await db.get(interaction.user.id)
				const oneday = 60 * 60 * 24 * 1000

				if (!found || found.date + oneday < Date.now()) {
					await interaction.deferReply()
					await db.set(interaction.user.id, { date: Date.now() })
					const rand = Math.random() * 100
					if (rand >= 90) {
						await starton.post(`/smart-contract/${process.env.STARTON_SMART_CONTRACT_ID}/interact`, {
							functionName: 'mint',
							params: [
								address,
								'3000000000000000000000'
							],
						}).then(async tx => {
							interaction.editReply(`Congratulation <@${interaction.user.id}> you WIN :rocket: :partying_face: :gift: https://cchain.explorer.avax.network/tx/${tx.data.transactionHash}\n\nThis transaction was powered by https://starton.io`)
							await db.set(interaction.user.id, { hash: tx.data.transactionHash, date: Date.now() })
						})
						.catch(async err => {
							console.log(err.response.data)
							await db.delete(interaction.user.id)
							interaction.editReply("An error occurred, please wait a few minutes and retry again.")
						})
					} else {
						interaction.editReply(`Sorry <@${interaction.user.id}> you didn't win :cry: But don't worry, you can try again once every 24 hours!`)
					}
				} else {
					const now = moment()
					const canReplay = moment(found.date).add(oneday)
					const hours = canReplay.diff(now, 'hour')
					const minutes = canReplay.subtract(hours, 'hours').diff(now, 'minute')
					const seconds = canReplay.subtract(minutes, 'minutes').diff(now, 'seconds')
					interaction.reply({
						content:`Too early, please wait ${hours} hours, ${minutes} minutes and ${seconds} seconds`,
						ephemeral: true
					})
				}
			}
		}

	}
}
