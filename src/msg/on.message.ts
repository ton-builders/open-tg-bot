import { Bot, InlineKeyboard, InputMediaBuilder, Keyboard } from "grammy";
import { MyContext } from "../global.types";

export function on_message(bot: Bot<MyContext>) {
  bot.on("message", async (ctx) => {
    let msg_text = ctx.message.text;

    if (msg_text?.startsWith("test")) {
      await ctx.reply("Starts With 'test': " + msg_text);
    } else if (msg_text?.startsWith("markdown")) {
      await ctx.reply(
        "Markdown Msg\\. " +
          "*Hi\\!* _Welcome_ to [grammY](https://grammy.dev)\\. ",
        {
          parse_mode: "MarkdownV2",
        },
      );
    } else if (msg_text?.startsWith("html")) {
      await ctx.reply(
        'HTML Msg. <b>Hi!</b> <i>Welcome</i> to <a href="https://grammy.dev">grammY</a>. ',
        { parse_mode: "HTML" },
      );
    } else if (msg_text?.startsWith("force")) {
      await ctx.reply(
        "Hi! I can only read messages that explicitly reply to me!",
        {
          // Make Telegram clients automatically show a reply interface to the user.
          reply_markup: { force_reply: true },
        },
      );
    } else if (msg_text?.startsWith("inline")) {
      // inline keyboard button
      const inlineKeyboard = new InlineKeyboard()
        .text("Button 1", "inline_btn_1")
        .text("Button 2", "inline_btn_2")
        .row()
        .text("Next", "inline_btn_next_page");

      // Send inline keyboard with message.
      await ctx.reply("Inline Keyboard Demo", {
        reply_markup: inlineKeyboard,
      });

      // view query.inline.ts to find the callback logic
    } else if (msg_text?.startsWith("keyboard")) {
      // inline keyboard button
      const keyboard = new Keyboard()
        .text("Yes, they certainly are")
        .row()
        .text("I'm not quite sure")
        .row()
        .text("No. 😈")
        .resized();

      // Send inline keyboard with message.
      await ctx.reply("Keyboard Button Demo", {
        reply_markup: keyboard,
      });

      // view query.inline.ts to find the callback logic
    } else if (msg_text?.startsWith("media")) {
      const photo1 = InputMediaBuilder.photo(
        "https://ton.org/download/ton_logo_light_background.png",
        {
          caption: "TON is awesome",
        },
      );

      await ctx.replyWithMediaGroup([photo1, photo1, photo1]);
    } else {
      await ctx.reply("Echo: " + msg_text);
    }
  });
}
