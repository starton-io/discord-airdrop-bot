import axios from "axios";
import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";

const starton = axios.create({
    baseURL: "https://api.starton.io/v2",
    headers: {
        "x-api-key": process.env.STARTON_API_KEY,
    },
})

@Discord()
abstract class Deploy {

	@Slash("deploy")
	private async deploy(
		@SlashOption("name", { required: true})
		name: string,

		@SlashOption("symbol", { required: true})
		symbol: string,

		@SlashOption("supply", { required: true})
		supply: string,

		@SlashChoice("Ethereum Ropsten", "ethereum-ropsten")
		@SlashChoice("Avalanche Fuji", "avalanche-fuji")
		@SlashChoice("Binance Testnet", "binance-testnet")
		@SlashChoice("Polygon mumbai", "polygon-mumbai")
		@SlashOption("network", { description: "Which network? (testnet only)", required: true })
		network: string,

		interaction: CommandInteraction
	) {
		await interaction.deferReply();
		starton.post( '/smart-contract/from-template', {
			"network": network,
			"name": name,
			"templateId": 'sct_82bde80651bd40cca12f044cb80821bc',
			"params": [
				name,
				symbol,
				supply
			]
		}).then(async tx => {
			interaction.editReply(`Hash: ${tx.data.creationHash}; Address: ${tx.data.address}`)
		})
		.catch(async err => {
			console.log(err.response.data)
			interaction.editReply("Could not deploy the smart contract, maybe you don't have enough gas ?")
		})

	}
}
