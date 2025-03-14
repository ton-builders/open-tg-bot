import { Bot } from "grammy";
import { MyContext } from "./global.types";
import { on_message } from "./msg/on.message";
import { bind_command_start } from "./cmd/start";
import { on_callback_query_inline } from "./callback/query.inline";
import { bind_command_stars } from "./stars/stars.payment";

export function main_entry_point(bot: Bot<MyContext>) {
  bind_command_start(bot);
  bind_command_stars(bot);
  on_callback_query_inline(bot);
  on_message(bot);
}
