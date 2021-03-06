
# Starton Discord bot

This bot allows you to airdrop tokens (ERC20) or NFTs (ERC721 / ERC1155) to your community directly from discord.
People need to go to a specific channel and write `/airdrop <their address>` and they will have 1 chance on 10 to win.

# Requirements
## Discord
You need to have a Discord Developper Account.
You can apply here: [discord developer portal](https://discord.com/developers/)
You can find more informations here: https://discordjs.guide/preparations/setting-up-a-bot-application.html

When you have your credentials you need to set them in a `.env` file

- `BOT_TOKEN=`
- `GUILD_ID=`


You also need to set the **channel id** related to your contest.

- `CHANNEL_ID=`

## Starton Connect
You need to have a Starton Connect account.
You can create a free account [here](https://connect.starton.io)

You can create an API key in the `Developer` section.
You will need to add it to the `.env` file aswell.

- `STARTON_API_KEY=`

## Deploy or import a smart contract on Starton

You can now deploy a new contract or import an existing one in Starton's [`Deploy` section](https://connect.starton.io/deploy).

Once deployed you need to add in the `.env` file.

- `STARTON_SMART_CONTRACT_ADDRESS=`
- `STARTON_SMART_CONTRACT_NETWORK=`

# Start the bot
## Install

```bash
git clone https://github.com/starton-io/discord-airdrop-bot
cd discord-airdrop-bot
```

## Start in dev:
```bash
yarn dev #(or npm run dev)
```

## Start in production:
```bash
yarn build && yarn start #(or npm run build && npm start)
```

## Extending the bot
This bot use the amazing https://github.com/oceanroleplay/discord.ts package.

You can find the full documentation on their website: https://discord-ts.js.org/

## Authors

- [@cervantescedric - CTO @starton.io](https://linkedin.com/in/cedriccervantes/)
