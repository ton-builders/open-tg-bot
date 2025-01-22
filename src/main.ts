import { Bot } from "grammy";
import { MyContext } from "./global.types";
import {bind_command_star} from "./cmd/stars";
import {on_message} from "./msg/on.message";

export function main_entry_point(bot: Bot<MyContext>) {
  bind_command_star(bot);
  on_message(bot);
}
