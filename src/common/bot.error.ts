export class BotError extends Error {
  static Internal = new BotError(
    '<b>Произошла неизвестная ошибка</b>\nПопробуйте еще раз',
  );
  static Weather = new BotError(
    '<b>Произошла ошибка получения погоды</b>\nПопробуйте еще раз',
  );
}
