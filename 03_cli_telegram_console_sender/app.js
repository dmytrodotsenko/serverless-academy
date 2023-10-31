const { Command } = require("commander");
const program = new Command();
const TelegramBot = require("node-telegram-bot-api");
const path = require("path");

const token = "6507432213:AAFWsFIu74ZZvG_mVCXbLMs91sO0XQHp2-g";
const myChatID = 386161016; // At this solution i decide to hard code this ID :)
const bot = new TelegramBot(token, { polling: true });

program
  .name("telegramBot_cli")
  .description("CLI to send messages on bot")
  .version("1.0.0");

program
  .description("Usage: app [options] [message/path]")
  .argument(
    " <string>|<path/url> ",
    "Text message for bot or path/url to the photo"
  )
  .option("-m, message", "send default message to bot")
  .option("-p, photo", "send photo to bot")
  .action((arg, options) => {
    if (options.m === true) {
      bot.sendMessage(myChatID, arg).then(() => process.exit(0));
    }
    if (options.p === true) {
      let path;
      const file = /\\/g;
      const isUrl = /^(https?|ftp):*$/;
      if (!file.test(arg) && !isUrl.test(arg)) {
        console.log("Please enter correct path/url to the photo");
        process.exit(0);
      }
      isUrl.test(arg) ? (path = arg) : (path = arg.replace(file, "\\\\"));

      bot.sendPhoto(myChatID, path).then(() => {
        process.exit(0);
      });
    }
  });

program.parse();
