import { Bot, InlineKeyboard } from "grammy";
import { MyContext } from "../global.types";
import { Gifts } from "@grammyjs/types";

export function bind_gifts(bot: Bot<MyContext>) {
  bot.command("gifts", async (ctx) => {
    let gifts: Gifts = await ctx.api.getAvailableGifts();
    console.info("=========== Available Gifts ===============");
    console.log(" count: ", gifts.gifts.length);
    if (gifts.gifts.length > 0) {
      for (const gift of gifts.gifts) {
        console.info(gift);
      }
    }

    await ctx.reply("Available Gifts");
    const inlineKeyboard = new InlineKeyboard();
    if (gifts.gifts.length > 0) {
      for (const gift of gifts.gifts) {
        inlineKeyboard
          .text(
            "" + gift.sticker.emoji + " Stars: " + gift.star_count,
            JSON.stringify({ method: "send_gift", param: `${gift.id}` }),
          )
          .row();
      }
    }

    // Send inline keyboard with message.
    await ctx.reply("Inline Keyboard Demo", {
      reply_markup: inlineKeyboard,
    });
  });
}
