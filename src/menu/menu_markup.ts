import { Bot } from "grammy";
import { MyContext } from "../global.types";
import { Menu } from "@grammyjs/menu";

export function menu_markup_demo(bot: Bot<MyContext>) {
  let withPleasure = "*Menu Demo* : Sub Menu with Back Button\\!";
  const menu_home = new Menu<MyContext>("menu_home")
    .submenu("A", "menu_wallets", async (ctx) => {
      await ctx.editMessageText("This is submenu of A.");
    })
    .submenu("B", "menu_explorers")

    .row();

  const menu_wallets = new Menu<MyContext>("menu_wallets")
    .url("A-1", "https://t.me/wallet")
    .row()
    .url("A-2", "https://www.tonkeeper.com/")
    .row()
    .back("◀️ Go Back", async (ctx) => {
      await ctx.editMessageText(withPleasure, {
        parse_mode: "MarkdownV2",
      });
    });

  const menu_explorers = new Menu<MyContext>("menu_explorers")
    .url("Tonviewer", "https://tonviewer.com/")
    .row()
    .url("TON Scan", "https://tonscan.org/")
    .row()
    .url("DTON", "https://tonscan.org/")
    .row()
    .url("ton.cx", "https://ton.cx/")
    .row()
    .url("TON Whales", "https://tonwhales.com/explorer")
    .row()
    .back("◀️ Go Back");

  menu_home.register(menu_wallets);
  menu_home.register(menu_explorers);

  bot.use(menu_home);
  bot.command("menu", async (ctx) => {
    // ctx.react("🎉").then();
    await ctx
      .reply(withPleasure, {
        parse_mode: "MarkdownV2",
        reply_markup: menu_home,
      })
      .catch((reason: Error) => {
        console.error(reason);
      });
  });
}
