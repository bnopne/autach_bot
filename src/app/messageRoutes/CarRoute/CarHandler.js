const Handler = require('../../../infrastructure/Handler');
const User = require('../../../entities/User');
const Car = require('../../../entities/Car');
const Chat = require('../../../entities/Chat');
const { getCarCaption } = require('../../../text/captions');
const { getCarKeyboard } = require('../../../text/keyboards');
const phrases = require('../../../text/phrases');
const UserExecutesCommand = require('../../../infrastructure/events/UserExecutesCommand');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');
const commands = require('../../../text/commands');

class CarHandler extends Handler {
  async handle(message) {
    this.eventBus.emit(
      EVENT_TYPES.USER_EXECUTES_COMMAND,
      new UserExecutesCommand(commands.car, message.from.id, message.chat.id),
    );

    const user = message.replyToMessage
      ? await User.findById(message.replyToMessage.from.id)
      : await User.findById(message.from.id);

    const car = await Car.findActiveForUser(user);

    if (!car) {
      await this.bot.sendMessage(
        message.chat.id,
        phrases.commands.car.doesntHaveCar(),
        { reply_to_message_id: message.messageId },
      );

      return;
    }

    const chat = await Chat.findById(message.chat.id);
    const isBanned = await car.isBannedInChat(chat);

    if (isBanned) {
      await this.bot.sendMessage(
        message.chat.id,
        phrases.commands.car.carWasBanned(),
        { reply_to_message_id: message.messageId },
      );

      return;
    }

    const { likes, dislikes } = await car.getScore();

    await this.bot.sendPhoto(
      message.chat.id,
      car.telegramImageId,
      {
        reply_to_message_id: message.messageId,
        caption: getCarCaption(likes, dislikes),
        reply_markup: getCarKeyboard(car).export(),
        parse_mode: 'markdown',
      },
    );
  }
}

module.exports = CarHandler;
