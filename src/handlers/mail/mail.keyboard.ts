import { MessageText } from 'common/message-text.enum';
import { Markup } from 'telegraf';

export const confirmKeyboard = Markup.keyboard([
  MessageText.Confirm,
  MessageText.Сancel,
]).resize();
