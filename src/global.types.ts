import { Context, SessionFlavor } from "grammy";
import { Conversation, ConversationFlavor } from "@grammyjs/conversations";
import { I18nFlavor } from "@grammyjs/i18n";

export type MyConversation = Conversation<MyContext>;

export interface BotConfig {
  botAdminId: number;
  isDeveloper: boolean;
}
export interface Dish {
  id: string;
  name: string;
}

export interface SessionData {
  favoriteIds: string[];
}

export type MyContext = Context &
  I18nFlavor &
  ConversationFlavor & {
    config: BotConfig;
  } & SessionFlavor<SessionData>;
