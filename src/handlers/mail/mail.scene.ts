import { MessageText } from 'common/message-text.enum';
import { startKeyboard } from 'handlers/start/start.keyboard';
import { Composer, Markup, Scenes, Telegraf } from 'telegraf';
import { confirmKeyboard } from './mail.keyboard';
import { Mail } from './mail.service';

export const SCENE_ID = 'MAILING_SCENE';
export const mailScene = (bot: Telegraf<Scenes.WizardContext>) => {
  const mail = new Mail(bot);
  const confirmHandler = new Composer<Scenes.WizardContext>();
  const messageHandler = new Composer<Scenes.WizardContext>();

  confirmHandler
    .hears(MessageText.Confirm, async (ctx) => {
      await ctx.reply(MessageText.MailInput, Markup.removeKeyboard());
      ctx.wizard.next();
    })
    .hears(MessageText.Сancel, async (ctx) => {
      await ctx.scene.leave();
      await ctx.reply(MessageText.Main, startKeyboard);
    })
    .use((ctx) => ctx.reply(MessageText.MailConfirmError));

  messageHandler
    .on('text', async (ctx) => {
      const { text } = ctx.message;
      const { id } = ctx.chat;

      const count = await mail.send(id, text);
      await ctx.replyWithHTML(
        `Сообщение успешно доставлено\n<i>(получателей: ${count})</i>`,
        startKeyboard,
      );
      await ctx.scene.leave();
    })
    .use((ctx) => ctx.reply(MessageText.MailInputError));

  return new Scenes.WizardScene(
    SCENE_ID,
    async (ctx) => {
      await ctx.reply(MessageText.MailConfirm, confirmKeyboard);
      ctx.wizard.next();
    },
    confirmHandler,
    messageHandler,
  );
};
