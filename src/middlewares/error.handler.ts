import { Context, TelegramError } from 'telegraf';
import { BotError } from 'common/bot.error';
import { logger } from 'logger';

export const errorHandler = async (err: unknown, ctx: Context) => {
  // intended Error
  if (err instanceof BotError) {
    ctx.replyWithHTML(err.message);
  } else if (err instanceof TelegramError) {
    logger.warn(err);
  } else {
    ctx.replyWithHTML(BotError.Internal.message);
    logger.error(err);
  }
};
