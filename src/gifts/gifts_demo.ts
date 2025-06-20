import { Bot } from "grammy";
import { MyContext } from "../global.types";

export function bind_gifts(bot: Bot<MyContext>) {
  bot.command("available", async (ctx) => {
    let gifts = await ctx.api.getAvailableGifts();

    console.info("Available Gifts", gifts);

    await ctx.reply("Available Gifts");
  });
}
