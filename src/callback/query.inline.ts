import { Bot } from "grammy";
import { MyContext } from "../global.types";

// 注意区分 inline query https://grammy.dev/plugins/inline-query
export function on_callback_query_inline(bot: Bot<MyContext>) {
  bot.callbackQuery(["inline_btn_1", "inline_btn_2"], async (ctx) => {
    console.info(ctx.message);

    await ctx.answerCallbackQuery({
      text: "🧚‍♀️: you clicked " + ctx.callbackQuery.data,
    });

    await ctx.reply("you clicked " + ctx.callbackQuery.data);
  });
}
