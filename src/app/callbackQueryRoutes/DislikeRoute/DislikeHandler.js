const Handler = require('../../../infrastructure/Handler');
const Car = require('../../../entities/Car');
const CarVote = require('../../../entities/CarVote');
const User = require('../../../entities/User');
const { getCarKeyboard } = require('../../../text/keyboards');
const { getCarCaption } = require('../../../text/captions');
const phrases = require('../../../text/phrases');
const UserSendsCallbackQuery = require('../../../infrastructure/events/UserSendsCallbackQuery');
const { EVENT_TYPES } = require('../../../infrastructure/events/constants');

class DislikeHandler extends Handler {
  async handle(callbackQuery) {
    this.eventBus.emit(
      EVENT_TYPES.USER_SENDS_CALLBACK_QUERY,
      new UserSendsCallbackQuery(callbackQuery.from.id),
    );

    const user = await User.findById(callbackQuery.from.id);
    const car = await Car.findById(callbackQuery.data.getField('carId'));

    if (user.id === car.userId) {
      await this.bot.answerCallbackQuery(
        callbackQuery.id,
        { text: phrases.callbackQueries.dislike.cantVoteAgainstYourOwnCar() },
      );
      return;
    }

    const currentDonorVote = await CarVote.getForCarByUser(car, user);

    const needToUpdateCaption = !currentDonorVote || (currentDonorVote.isLike);

    if (currentDonorVote && currentDonorVote.isLike) {
      await currentDonorVote.toggleDown();
    }

    if (!currentDonorVote) {
      await CarVote.createDownVote(car, callbackQuery.from);
    }

    const { likes, dislikes } = await car.getScore();

    if (needToUpdateCaption) {
      await this.bot.editMessageCaption(
        getCarCaption(likes, dislikes),
        {
          chat_id: callbackQuery.message.chat.id,
          message_id: callbackQuery.message.messageId,
          reply_markup: getCarKeyboard(car).export(),
          parse_mode: 'markdown',
        },
      );
    }

    await this.bot.answerCallbackQuery(
      callbackQuery.id,
      { text: phrases.callbackQueries.dislike.done() },
    );
  }
}

module.exports = DislikeHandler;
