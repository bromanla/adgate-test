import { logger } from 'logger';
import { Context } from 'telegraf';
import { telegrafThrottler } from 'telegraf-throttler';

export const rateLimit = telegrafThrottler({
  inThrottlerError: async (ctx: Context) => {
    logger.debug(`${ctx.from?.id || ctx.chat?.id} hit the limit`);
  },
});
