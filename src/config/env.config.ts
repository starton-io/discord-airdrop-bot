/*
| Developed by Starton
| Filename : config.service.tsx
| Author : Calixte De Tourris (calixte@starton.io)
*/

/*
|--------------------------------------------------------------------------
| Config
|--------------------------------------------------------------------------
*/
const MANDATORY_KEYS = {
	BOT_TOKEN: 'BOT_TOKEN',
	GUILD_ID: 'GUILD_ID',
	CHANNEL_ID: 'CHANNEL_ID',
	STARTON_API_KEY: 'STARTON_API_KEY',
	STARTON_SMART_CONTRACT_ADDRESS: 'STARTON_SMART_CONTRACT_ADDRESS',
	STARTON_SMART_CONTRACT_NETWORK: 'STARTON_SMART_CONTRACT_NETWORK',
	STARTON_WALLET: 'STARTON_WALLET',
	NETWORK_EXPLORER_TX_ROUTE: 'NETWORK_EXPLORER_TX_ROUTE',
}

/*
|--------------------------------------------------------------------------
| Service
|--------------------------------------------------------------------------
*/
class EnvConfig {
	start() {
		Object.keys(MANDATORY_KEYS).map((name) => {
			if (!process.env[name]) {
				throw new Error(`${name} is missing from the .env file`)
			}
		})
	}

	get(name: keyof typeof MANDATORY_KEYS): string {
		const value = process.env[name]
		if (!value) {
			throw new Error(`${name} is missing from the .env file`)
		}
		return value
	}
}

export const configService = new EnvConfig()
