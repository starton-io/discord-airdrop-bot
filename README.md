# Starton Discord bot

This bot allows you to airdrop tokens (ERC20) or NFTs (ERC721 / ERC1155) to your community directly from Discord.
To attempt winning, users need to access a specific channel and enter `/airdrop <their address>`. They have 1 chance out of 10 to win.

## Prerequisites
### Discord
You need a Discord Developper Account.
You can apply on the [Discord Developer portal](https://discord.com/developers/)
[More information on how to set up a bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html)

### Starton
1. Go to [Starton.io](https://app.starton.io/).
1. Create an account for free.
1. In the `Developer` section, create an API key.
1. In the `Wallet` section, create a Wallet.
1. Deploy a new Smart Contract or import an existing one. Learn more in the [Smart contract documentation](https://docs.starton.io/docs/Smart-contract/understanding-smart-contracts).


## Setting your environment file

1. In a `.env` file:
    1. Set your credentials.

        - `BOT_TOKEN=`
        - `GUILD_ID=`

    1. Set the **Channel id** from where the bot should execute.

        - `CHANNEL_ID=`

    1. Set the **API key** and the **Wallet** from Starton.

        - `STARTON_API_KEY=`
        - `STARTON_WALLET=`

    1. Set up the **network**, **address** and **network explorer transaction route** for your Smart Contract.
       The network explorer transaction route is used so that your users can check the transaction on an explorer such as [etherscan.io](https://etherscan.io/)

        - `STARTON_SMART_CONTRACT_ADDRESS=`
        - `STARTON_SMART_CONTRACT_NETWORK=`
        - `NETWORK_EXPLORER_TX_ROUTE=`

## Starting the bot
### Installation

```bash
# Clone the project
git clone https://github.com/starton-io/discord-airdrop-bot

# Navigate to project folder
cd discord-airdrop-bot

# Install dependencies
yarn install #(or npm install)
```

### Starting in development

```bash
yarn dev #(or npm run dev)
```

### Starting in production

```bash
yarn build && yarn start #(or npm run build && npm start)
```

## Extending the bot
This bot uses the amazing [Discord package](https://github.com/oceanroleplay/discord.ts).

You can find the full documentation on their [website](https://discord-ts.js.org/).

## Authors

- [@cervantescedric - CTO @starton.io](https://linkedin.com/in/cedriccervantes/)
- [@Ovoda - Developer @starton.io](calixte@starton.io)
