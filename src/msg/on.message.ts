import {Bot, InlineQueryResultBuilder} from "grammy";
import {MyContext, MyConversation} from "../global.types";

export function on_message(bot: Bot<MyContext>) {
    bot.on("message", async (ctx) => {
        let msg_text = ctx.message.text;
        if (
            msg_text?.startsWith("prepared") ||
            msg_text?.startsWith("inline")
        ) {
            console.info(ctx.message)
            const result = InlineQueryResultBuilder.contact(
                "id",
                "phone",
                "first",
                {last_name: "last"},
            ).text("#Text", {parse_mode: "Markdown"});

            let preparedInlineMessage = await ctx.savePreparedInlineMessage(result, {
                allow_user_chats: true,
                allow_bot_chats: true,
                allow_group_chats: true
            });
            console.info(JSON.stringify(preparedInlineMessage))


            await ctx.reply("Got another messag2e!")
        }
    });
}
