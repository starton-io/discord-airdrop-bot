// import { CommandInteraction, MessageEmbed } from "discord.js";
// import { Discord, MetadataStorage, Slash } from "discordx";
// import { sendPaginatedEmbeds } from "@discordx/utilities";
//
// @Discord()
// export abstract class SlashExample {
//   // example: pagination for all slash command
//   @Slash("slashes", { description: "Pagination for all slash command" })
//   async pages(interaction: CommandInteraction): Promise<void> {
//     const commands = MetadataStorage.instance.applicationCommands.map((cmd) => {
//       return { name: cmd.name, description: cmd.description };
//     });
//
//     const pages = commands.map((cmd, i) => {
//       return new MessageEmbed()
//         .setFooter(`Page ${i + 1} of ${commands.length}`)
//         .setTitle("**Slash command info**")
//         .addField("Name", cmd.name)
//         .addField("Description", cmd.description);
//     });
//
//     await sendPaginatedEmbeds(interaction, pages);
//   }
// }
