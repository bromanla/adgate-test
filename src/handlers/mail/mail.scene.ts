import { MessageText } from 'common/message-text.enum';
import { startKeyboard } from 'handlers/start/start.keyboard';
import { Composer, Markup, Scenes, Telegraf } from 'telegraf';
import { confirmKeyboardInline } from './mail.keyboard';
import { Mail } from './mail.service';

export const SCENE_ID = 'MAILING_SCENE';
export const mailScene = (bot: Telegraf<Scenes.WizardContext>) => {
  const mail = new Mail(bot);
  const confirmHandler = new Composer<Scenes.WizardContext>();
  const messageHandler = new Composer<Scenes.WizardContext>();

  confirmHandler
    .action(MessageText.Confirm, async (ctx) => {
      await ctx.deleteMessage();
      await ctx.reply(MessageText.MailInput, Markup.removeKeyboard());
      ctx.wizard.next();
    })
    .action(MessageText.Сancel, async (ctx) => {
      await ctx.deleteMessage();
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
      // you rickrolling
      // very bad decision to remove the regular keyboard in this way
      // but it seemed to me that UX is better
      // was originally made with a built-in keyboard
      const { message_id } = await ctx.reply(
        'Never Gonna Give You Up',
        Markup.removeKeyboard(),
      );
      await ctx.deleteMessage(message_id);
      await ctx.reply(MessageText.MailConfirm, confirmKeyboardInline);
      ctx.wizard.next();
    },
    confirmHandler,
    messageHandler,
  );
};
