const Route = require('../../../infrastructure/Route');
const CarHandler = require('./CarHandler');
const DataSaverMiddleware = require('../../middlewares/MessageDataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/MessageAgeCheckMiddleware');
const { car } = require('../../../text/commands');

class CarRoute extends Route {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
    ];
  }

  static get HandlerCls() {
    return CarHandler;
  }

  isMatching(message) {
    if (!message.text) {
      return false;
    }

    return (message.text === `${car}@${this.bot.info.username}`)
      || (message.text === `${car}`);
  }
}

module.exports = CarRoute;
