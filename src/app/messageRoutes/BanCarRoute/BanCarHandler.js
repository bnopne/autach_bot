const Handler = require('../../../infrastructure/Handler');
const User = require('../../../entities/User');
const Chat = require('../../../entities/Chat');
const Car = require('../../../entities/Car');
const phrases = require('../../../text/phrases');
const UserExecutesCommand = require('../../../infrastructure/events/UserExecutesCommand');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');
const commands = require('../../../text/commands');

class BanCarHandler extends Handler {
  async handle(message) {
    this.eventBus.emit(
      EVENT_TYPES.USER_EXECUTES_COMMAND,
      new UserExecutesCommand(commands.banCar, message.from.id, message.chat.id),
    );

    const repliedMessage = message.replyToMessage;

    if (!repliedMessage) {
      await this.bot.sendMessage(
        message.chat.id,
        phrases.commands.banCar.replySomeone(),
      );

      return;
    }

    if (repliedMessage.from.id === message.from.id) {
      await this.bot.sendMessage(
        message.chat.id,
        phrases.commands.banCar.cannotBanYourOwnCar(),
      );

      return;
    }

    const user = await User.findById(repliedMessage.from.id);
    const car = await Car.findActiveForUser(user);

    if (!car) {
      await this.bot.sendMessage(
        message.chat.id,
        phrases.commands.banCar.doesntHaveCar(),
      );

      return;
    }

    const chat = await Chat.findById(message.chat.id);
    await car.banInChat(chat);

    await this.bot.sendMessage(
      message.chat.id,
      phrases.commands.banCar.done(),
    );
  }
}

module.exports = BanCarHandler;
