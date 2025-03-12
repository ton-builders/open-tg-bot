import { Bot } from "grammy";
import { MyContext } from "../global.types";

export function on_message(bot: Bot<MyContext>) {
  bot.on("message", async (ctx) => {
    let msg_text = ctx.message.text;

    if (msg_text?.startsWith("test")) {
      await ctx.reply("Starts With 'test': " + msg_text);
    } else {
      await ctx.reply("Echo: " + msg_text);
    }
  });
}
