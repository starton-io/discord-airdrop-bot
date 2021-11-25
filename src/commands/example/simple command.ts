// import {
//   Discord,
//   SimpleCommand,
//   SimpleCommandMessage,
//   SimpleCommandOption,
// } from "discordx";
//
// @Discord()
// class simpleCommandExample {
//   @SimpleCommand("hello", { aliases: ["hi"] })
//   hello(command: SimpleCommandMessage) {
//     command.message.reply(`👋 ${command.message.member}`);
//   }
//
//   @SimpleCommand("sum", { argSplitter: "+" })
//   sum(
//     @SimpleCommandOption("num1") num1: number,
//     @SimpleCommandOption("num2") num2: number,
//     command: SimpleCommandMessage
//   ) {
//     if (typeof num1 !== "number" || typeof num2 !== "number") {
//       return command.message.reply(`**Usage**: 1+1`);
//     }
//     command.message.reply(`total = ${num1 + num2}`);
//   }
// }
