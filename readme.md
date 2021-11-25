
# Starton Discord bot

This bot allows you to airdrop tokens (ERC20) or NFTs (ERC721 / ERC1155) to your community directly from discord.
People need to go to a specific channel and write `/airdrop <their address>` and they will have 1 chance on 10 to win.

# Requirements
## Discord
You need to have a Discord Developper Account.
You can apply here: [discord developer portal](https://discord.com/developers/)

When you have your credentials you need to set them in a `.env` file

- `BOT_TOKEN=`


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

Once deployed you should see in the url the `smart contract id` which you need to add in the `.env` file.

- `STARTON_SMART_CONTRACT_ID=`

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

## Authors

- [@cervantescedric - CTO @starton.io](https://linkedin.com/in/cedriccervantes/)
