import { CommandInteraction } from 'discord.js'
import { Discord, Slash, SlashChoice, SlashOption } from 'discordx'
import { configService } from '../config/env.config'
import { StartonApi } from '../config/api.config'

/*
|--------------------------------------------------------------------------
| Contract
|--------------------------------------------------------------------------
*/
interface SmartContractCreateFromTemplateResponse {
	data: {
		transaction: {
			transactionHash: string
		}
		smartContract: {
			address: string
		}
	}
}

/*
|--------------------------------------------------------------------------
| Command
|--------------------------------------------------------------------------
*/
@Discord()
export abstract class Deploy {
	@Slash('deploy')
	private async deploy(
		@SlashOption('name', { required: true })
		name: string,

		@SlashOption('symbol', { required: true })
		symbol: string,

		@SlashOption('supply', { required: true })
		supply: string,

		@SlashChoice('Avalanche Fuji', 'avalanche-fuji')
		@SlashChoice('Binance Testnet', 'binance-testnet')
		@SlashChoice('Polygon mumbai', 'polygon-mumbai')
		@SlashOption('network', { description: 'Which network? (testnet only)', required: true })
		network: string,

		interaction: CommandInteraction,
	) {
		await interaction.deferReply()
		try {
			const { data }: SmartContractCreateFromTemplateResponse = await StartonApi.post(
				'/smart-contract/from-template',
				{
					network: network,
					name: name,
					templateId: 'sct_81d50607677241beac764bfadd31a3a7',
					signerWallet: configService.get('STARTON_WALLET'),
					params: [name, symbol, supply, configService.get('STARTON_WALLET')],
				},
			)
			await interaction.editReply(
				`Hash: ${data.transaction.transactionHash}; Address: ${data.smartContract.address}`,
			)
		} catch (error) {
			await interaction.editReply("Could not deploy the smart contract, maybe you don't have enough gas ?")
			console.log(error)
		}
	}
}
