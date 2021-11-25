// import {
//   ButtonInteraction,
//   CommandInteraction,
//   MessageButton,
//   MessageActionRow,
//   Snowflake,
// } from "discord.js";
// import { ButtonComponent, Discord, Slash, SlashOption } from "discordx";
//
// @Discord()
// class buttonExample {
//   @Slash("hello")
//   async hello(
//     @SlashOption("user", { required: true, type: "USER" }) user: Snowflake,
//     interaction: CommandInteraction
//   ) {
//     await interaction.deferReply();
//
//     const helloBtn = new MessageButton()
//       .setLabel("Hello")
//       .setEmoji("👋")
//       .setStyle("PRIMARY")
//       .setCustomId("hello-btn");
//
//     const row = new MessageActionRow().addComponents(helloBtn);
//
//     interaction.editReply({
//       content: `<@${user}>, Say hello to bot`,
//       components: [row],
//     });
//   }
//
//   @ButtonComponent("hello-btn")
//   mybtn(interaction: ButtonInteraction) {
//     interaction.reply(`👋 ${interaction.member}`);
//   }
// }
