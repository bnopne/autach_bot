const Route = require('../../../infrastructure/Route');
const SetCarHandler = require('./SetCarHandler');
const DataSaverMiddleware = require('../../middlewares/MessageDataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/MessageAgeCheckMiddleware');
const { setcar } = require('../../../text/commands');

class SetCarRoute extends Route {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
    ];
  }

  static get HandlerCls() {
    return SetCarHandler;
  }

  isMatching(message) {
    if (!message.text) {
      return false;
    }

    return (message.text === `${setcar}@${this.bot.info.username}`)
      || (message.text === `${setcar}`);
  }
}

module.exports = SetCarRoute;
