import {Bot} from "grammy";
import type {LabeledPrice} from "grammy/out/types";
import {AbortSignal} from "grammy/out/shim.node";
import {Other} from "grammy/out/core/api";

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot("7841070391:AAGEfrWB53Rh4VcoQ-016KrYdgfA3vipLxw"); // <-- put your bot token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// Handle the /start command.
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

bot.command("pay",
    (ctx) => ctx.replyWithInvoice(
        "Test Product", // Product title
        "Test description", // Product description
        "{'key':'value'}", // Product payload, not required for now
        "XTR", // Stars Currency
        [
            {amount: 1, label: "Test Product"}, // Product variants
        ]
    )
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





// Handle other messages.
bot.on("message", (ctx) => ctx.reply("Got another message!"));

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start();




/**
 * Use this method to create a link for an invoice.
 * Returns the created invoice link as String on success.
 *
 * @param title Product name, 1-32 characters
 * @param description Product description, 1-255 characters
 * @param payload Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes.
 * @param provider_token Payment provider token, obtained via BotFather
 * @param currency Three-letter ISO 4217 currency code, see more on currencies
 * @param prices Price breakdown, a list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.)
 * @param other Optional remaining parameters, confer the official reference below
 * @param signal Optional `AbortSignal` to cancel the request
 *
 * **Official reference:** https://core.telegram.org/bots/api#createinvoicelink
 */
// createInvoiceLink(title: string, description: string, payload: string, provider_token: string, currency: string, prices: LabeledPrice[], other?: Other<R, "createInvoiceLink", "title" | "description" | "payload" | "provider_token" | "currency" | "prices">, signal?: AbortSignal): Promise<string>;