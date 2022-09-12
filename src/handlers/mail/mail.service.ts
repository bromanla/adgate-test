import { Not } from 'typeorm';
import { userRepository } from 'database';
import { Scenes, Telegraf } from 'telegraf';
import { setTimeout } from 'timers/promises';
import { logger } from 'logger';
import { User } from 'database/entities/user.entity';

export class Mail {
  /**
   * telegram limit 30 messages per 1 second
   * we will send 10 messages per second (100ms interval)
   * to keep limits
   */
  private readonly logger = logger;
  private readonly timeLimit = 100;
  private readonly userRepository = userRepository;

  constructor(private readonly bot: Telegraf<Scenes.WizardContext>) {}

  async send(senderId: number, message: string) {
    this.logger.debug(`user: ${senderId} send: ${message}`);

    const formattedMessage = `<b>Рассылка: </b>${message}`;
    const users = await this.userRepository.find({
      where: {
        userId: Not(senderId),
        enable: true,
      },
    });

    const badUsers: User[] = [];

    for (const user of users) {
      await this.bot.telegram
        .sendMessage(user.userId, formattedMessage, {
          parse_mode: 'HTML',
        })
        .catch((err) => {
          if (err.message === '403: Forbidden: bot was blocked by the user') {
            logger.warn(`user: ${user.userId} blocked the bot`);
            user.enable = false;
            badUsers.push(user);
          } else {
            logger.error(err);
          }
        });
      await setTimeout(this.timeLimit);
    }

    await this.userRepository.save(badUsers);
    return users.length - badUsers.length;
  }
}
