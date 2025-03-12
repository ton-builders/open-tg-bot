import { Bot } from "grammy";
import { MyContext } from "../global.types";

export function bind_command_start(bot: Bot<MyContext>) {
  bot.command("start", (ctx) => ctx.reply("reply of /start command"));
}
