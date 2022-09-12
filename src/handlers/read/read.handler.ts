import { FilePath } from 'common/file-path.enum';
import { MessageText } from 'common/message-text.enum';
import { Route } from 'common/route.enum';
import { Scenes, Telegraf } from 'telegraf';

export const readHandler = (bot: Telegraf<Scenes.WizardContext>) => {
  bot.hears(Route.Read, async (ctx) => {
    await ctx.replyWithChatAction('upload_photo');
    await ctx.replyWithPhoto({ source: FilePath.ReadImage });
    await ctx.replyWithChatAction('upload_document');
    await ctx.replyWithDocument(
      { source: FilePath.ReadDocument },
      { caption: MessageText.Read },
    );
  });
};
