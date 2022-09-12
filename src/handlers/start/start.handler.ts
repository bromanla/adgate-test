import { MessageText } from 'common/message-text.enum';
import { Scenes, Telegraf } from 'telegraf';
import { startKeyboard } from './start.keyboard';
import { userRepository } from 'database';
import { BotError } from 'common/bot.error';

export const startHandler = async (bot: Telegraf<Scenes.WizardContext>) => {
  bot.start(async (ctx) => {
    const userId = ctx.chat?.id;

    if (!userId) throw BotError.Internal;

    let user = await userRepository.findOne({ where: { userId } });

    user = user
      ? (user.enable = true) && user
      : userRepository.create({ userId });

    await userRepository.save(user);
    await ctx.reply(MessageText.Start, startKeyboard);
  });
};
