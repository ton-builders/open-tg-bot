import { Bot } from "grammy";
import { MyContext } from "../global.types";

export function bind_command_star(bot: Bot<MyContext>) {
  bot.command("pay", (ctx) =>
    ctx.replyWithInvoice(
      "Test Product", // Product title
      "Test description", // Product description
      "{'key':'value'}", // Product payload, not required for now
      "XTR", // Stars Currency
      [
        { amount: 1, label: "Test Product" }, // Product variants
      ],
    ),
  );

  bot.on("pre_checkout_query", async function (ctx) {
    try {
      return await ctx.answerPreCheckoutQuery(true);
    } catch (e) {
      console.error("answerPreCheckoutQuery failed");
    }
  });

  // Map is used for simplicity. For production use a database
  const paidUsers = new Map();

  bot.on("message:successful_payment", (ctx) => {
    if (!ctx.message || !ctx.message.successful_payment || !ctx.from) {
      return;
    }

    console.info(JSON.stringify(ctx.message));

    paidUsers.set(
      ctx.from.id,
      ctx.message.successful_payment.telegram_payment_charge_id,
    );

    console.log(ctx.message.successful_payment);
  });

  bot.command("status", (ctx) => {
    const message = paidUsers.has(ctx?.from?.id)
      ? "You have paid"
      : "You have not paid yet";
    return ctx.reply(message);
  });

  bot.command("refund", async (ctx) => {
    const userId = ctx?.from?.id;
    if (!userId) {
      return ctx.reply("Not valid user!");
    }
    if (!paidUsers.has(userId)) {
      return ctx.reply("You have not paid yet, there is nothing to refund");
    }

    return await ctx.api
      .refundStarPayment(userId, paidUsers.get(userId))
      .then(() => {
        paidUsers.delete(userId);
        return ctx.reply("Refund successful");
      })
      .catch(() => ctx.reply("Refund failed"));
  });

  bot.command("link", async (ctx) => {
    const userId = ctx?.from?.id;
    if (!userId) {
      return ctx.reply("Not valid user!");
    }

    const title = "Test Product";
    const description = "Test description";
    const payload = "{}";
    const currency = "XTR";
    const prices = [{ amount: 1, label: "Test Product" }];

    const invoiceLink = await bot.api.createInvoiceLink(
      title,
      description,
      payload,
      "", // Provider token must be empty for Telegram Stars
      currency,
      prices,
    );

    return await ctx.reply(invoiceLink);
  });
}
