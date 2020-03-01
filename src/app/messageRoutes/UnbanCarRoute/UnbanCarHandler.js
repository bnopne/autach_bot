const Handler = require('../../../infrastructure/Handler');
const User = require('../../../entities/User');
const Chat = require('../../../entities/Chat');
const Car = require('../../../entities/Car');
const phrases = require('../../../text/phrases');
const UserExecutesCommand = require('../../../infrastructure/events/UserExecutesCommand');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');
const commands = require('../../../text/commands');

class UnbanCarHandler extends Handler {
  async handle(message) {
    this.eventBus.emit(
      EVENT_TYPES.USER_EXECUTES_COMMAND,
      new UserExecutesCommand(commands.unbanCar, message.from.id, message.chat.id),
    );

    const repliedMessage = message.replyToMessage;

    if (!repliedMessage) {
      await this.bot.sendMessage(
        message.chat.id,
        phrases.commands.unbanCar.replySomeone(),
      );

      return;
    }

    if (repliedMessage.from.id === message.from.id) {
      await this.bot.sendMessage(
        message.chat.id,
        phrases.commands.unbanCar.cantUnbanYourOwnCar(),
      );

      return;
    }

    const user = await User.findById(repliedMessage.from.id);
    const car = await Car.findActiveForUser(user);

    if (!car) {
      await this.bot.sendMessage(
        message.chat.id,
        phrases.commands.unbanCar.doesntHaveCar(),
      );

      return;
    }

    const chat = await Chat.findById(message.chat.id);
    await car.unbanInChat(chat);

    await this.bot.sendMessage(
      message.chat.id,
      phrases.commands.unbanCar.done(),
    );
  }
}

module.exports = UnbanCarHandler;
