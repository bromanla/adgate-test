import { config } from 'config';
import { Database } from 'database';
import { Telegraf, Scenes, session } from 'telegraf';
import { logger } from 'logger';
import { startHandler } from 'handlers/start/start.handler';
import { readHandler } from 'handlers/read/read.handler';
import { weatherHandler } from 'handlers/weather/weather.handler';
import { errorHandler } from 'middlewares/error.handler';
import { rateLimit } from 'middlewares/rate.limit';
import { mailHandler } from 'handlers/mail/mail.handler';
import { mailScene } from 'handlers/mail/mail.scene';

const launch = async () => {
  await Database.initialize();

  const bot = new Telegraf<Scenes.WizardContext>(config.telegram.token);
  const stage = new Scenes.Stage<Scenes.WizardContext>([mailScene(bot)], {
    ttl: 60 * 3,
  });

  bot.use(session());
  bot.use(stage.middleware());
  bot.use(rateLimit);
  bot.catch(errorHandler);

  const handlers = [startHandler, readHandler, weatherHandler, mailHandler];
  handlers.forEach((handler) => handler(bot));

  bot.use(async (ctx) => ctx.reply('Неизвестная команда. Наберите /start'));

  // do not process messages that came during the inactivity of the bot
  // otherwise we can exceed the telegram api limits
  await bot.launch({ dropPendingUpdates: true });
  logger.info('bot launched');

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

launch();
