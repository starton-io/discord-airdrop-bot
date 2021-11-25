import axios from "axios";
import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";

const starton = axios.create({
    baseURL: "https://api-connect.starton.io/v1",
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

		@SlashChoice("Ethereum Ropsten", "ETHEREUM_ROPSTEN")
		@SlashChoice("Avalanche Fuji", "AVALANCHE_FUJI")
		@SlashChoice("Binance Testnet", "BINANCE_TESTNET")
		@SlashOption("network", { description: "Which network? (testnet only)", required: true })
		network: string,

		interaction: CommandInteraction
	) {
		await interaction.deferReply();
		starton.post( '/smart-contract/from-template', {
			"networkId": network,
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
