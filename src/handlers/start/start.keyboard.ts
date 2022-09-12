import { Markup } from 'telegraf';
import { Route } from 'common/route.enum';

const startKeyboard = Markup.keyboard([
  [Route.Weather],
  [Route.Read],
  [Route.Mail],
]).resize();

export { startKeyboard };
