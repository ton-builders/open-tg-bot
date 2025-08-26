import { Bot } from "grammy";
import { MyContext } from "../global.types";

export function bind_biz_bot(bot: Bot<MyContext>) {
  bot.command("biz", async (ctx) => {
    let newVar = await ctx.api.getBusinessAccountGifts(
      "DZi3S5UdcVU8BQAAQt4Zzv7OVns",
    );

    console.info(newVar);

    await ctx.reply("getBusinessAccountGifts");
  });

  bot.on("business_connection", async (ctx) => {
    console.info(ctx);
    await ctx.reply("business_connection: ");
  });

  bot.on("business_message", async (ctx) => {
    console.info(ctx);
    console.info(ctx.update.business_message.text);

    await ctx.reply(
      "this is a business auto reply: " + ctx.update.business_message.text,
    );
  });
}
