const Handler = require('../../../infrastructure/Handler');
const Car = require('../../../entities/Car');
const User = require('../../../entities/User');
const phrases = require('../../../text/phrases');
const commands = require('../../../text/commands');
const UserFailsToExecuteCommand = require('../../../infrastructure/events/UserFailsToExecuteCommand');
const UserExecutesCommand = require('../../../infrastructure/events/UserExecutesCommand');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');

class SetCarHandler extends Handler {
  async handle(message) {
    this.eventBus.emit(
      EVENT_TYPES.USER_EXECUTES_COMMAND,
      new UserExecutesCommand(commands.setcar, message.from.id, message.chat.id),
    );

    const repliedMessage = message.replyToMessage;

    if (!repliedMessage) {
      await this.bot.sendMessage(
        message.chat.id,
        phrases.commands.setcar.replyOnYourMessage(),
      );

      this.eventBus.emit(
        EVENT_TYPES.USER_FAILS_TO_EXECUTE_COMMAND,
        new UserFailsToExecuteCommand(commands.setcar, message.from.id, message.chat.id),
      );

      return;
    }

    if (repliedMessage.from.id !== message.from.id) {
      await this.bot.sendMessage(
        message.chat.id,
        phrases.commands.setcar.notYourMessage(),
      );

      this.eventBus.emit(
        EVENT_TYPES.USER_FAILS_TO_EXECUTE_COMMAND,
        new UserFailsToExecuteCommand(commands.setcar, message.from.id, message.chat.id),
      );

      return;
    }

    if (!(repliedMessage.photo)) {
      await this.bot.sendMessage(
        message.chat.id,
        phrases.commands.setcar.cantSeePhoto(),
      );

      this.eventBus.emit(
        EVENT_TYPES.USER_FAILS_TO_EXECUTE_COMMAND,
        new UserFailsToExecuteCommand(commands.setcar, message.from.id, message.chat.id),
      );

      return;
    }

    const user = await User.findById(repliedMessage.from.id);
    const currentActiveCar = await Car.findActiveForUser(user);

    if (currentActiveCar) {
      await currentActiveCar.setInactive();
    }

    await Car.createActiveForUser(
      user,
      repliedMessage.biggestPhoto.fileId,
    );

    await this.bot.sendMessage(
      message.chat.id,
      phrases.commands.setcar.done(),
      { reply_to_message_id: message.messageId },
    );
  }
}

module.exports = SetCarHandler;
