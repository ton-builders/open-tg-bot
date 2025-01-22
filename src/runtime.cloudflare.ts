import { Bot, webhookCallback } from "grammy/web";
import { MyContext } from "./global.types";
import Env from "./env.cloudflare";
import {main_entry_point} from "./main";

const SECRET_HEADER = "X-Telegram-Bot-Api-Secret-Token";
const SECRET_HEADER_LOWERCASE = SECRET_HEADER.toLowerCase();
export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (
      req.headers.get(SECRET_HEADER_LOWERCASE) === env.TELEGRAM_BOT_SECRET_TOKEN
    ) {
      const bot = new Bot<MyContext>(env.TELEGRAM_BOT_API_TOKEN);
      main_entry_point(bot);
      return webhookCallback(bot, "cloudflare-mod", {
        secretToken: env.TELEGRAM_BOT_SECRET_TOKEN,
      })(req);
    } else {
      return new Response("{msg:'secret'}", { status: 200 });
    }
  },
};
