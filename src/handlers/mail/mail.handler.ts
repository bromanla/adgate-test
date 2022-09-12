import { Scenes } from 'telegraf';
import { Route } from 'common/route.enum';
import { Telegraf } from 'telegraf';
import { SCENE_ID } from './mail.scene';

export const mailHandler = async (bot: Telegraf<Scenes.WizardContext>) => {
  bot.hears(Route.Mail, (ctx) => {
    ctx.scene.enter(SCENE_ID);
  });
};
