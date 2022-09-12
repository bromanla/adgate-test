import { Route } from 'common/route.enum';
import { Scenes, Telegraf } from 'telegraf';
import { CanadaWeather } from './weather.service';

export const weatherHandler = async (bot: Telegraf<Scenes.WizardContext>) => {
  const weather = new CanadaWeather();

  bot.hears(Route.Weather, async (ctx) => {
    const message = await weather.get();
    await ctx.replyWithHTML(message);
  });
};
