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

  bot.on("callback_query", async (ctx, next) => {
    console.info(
      "callback_query - start [",
      ctx.from?.username,
      ctx.callbackQuery.data,
      ctx.from?.id,
    );
    const callbackData = ctx.callbackQuery.data;
    if (!callbackData) {
      console.error("ERROR: callback_query data is null!");
      return;
    }

    let request: { method: string; param: string };
    try {
      request = JSON.parse(callbackData);
    } catch {
      //⚠️： this process CAN'T process, pass to next
      await next();
      return;
    }

    if ("send_gift" == request.method) {
      ctx.reply("you clicked " + ctx.callbackQuery.data);

      // TODO: 打开后，如果 bot 有足够的 Stars，任何人点击都可以从 bot 获得礼物
      // await ctx.api.sendGift(ctx.from?.id, request.param);
    } else {
      await next();
      return;
    }

    console.info(`callback_query - end ]`, ctx.from?.username, ctx.from?.id);
  });
}
