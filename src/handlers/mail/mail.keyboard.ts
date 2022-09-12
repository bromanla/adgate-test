import { MessageText } from 'common/message-text.enum';
import { Markup } from 'telegraf';

export const confirmKeyboardInline = Markup.inlineKeyboard([
  Markup.button.callback(MessageText.Confirm, MessageText.Confirm),
  Markup.button.callback(MessageText.Сancel, MessageText.Сancel),
]);
