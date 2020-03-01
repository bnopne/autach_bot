const Route = require('../../../infrastructure/Route');
const CheckCarHandler = require('./CheckCarHandler');
const DataSaverMiddleware = require('../../middlewares/MessageDataSaverMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/MessageAgeCheckMiddleware');
const { checkcar } = require('../../../text/commands');

class CheckCarRoute extends Route {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
    ];
  }

  static get HandlerCls() {
    return CheckCarHandler;
  }

  isMatching(message) {
    if (!message.text) {
      return false;
    }

    return (message.text === `${checkcar}@${this.bot.info.username}`)
      || (message.text === `${checkcar}`);
  }
}

module.exports = CheckCarRoute;
