const Route = require('../../../infrastructure/Route');
const DataSaverMiddleware = require('../../middlewares/MessageDataSaverMiddleware');
const AdminAuthMiddleware = require('../../middlewares/AdminAuthMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/MessageAgeCheckMiddleware');
const UnbanHandler = require('./UnbanCarHandler');
const { unbanCar } = require('../../../text/commands');

class UnbanCarRoute extends Route {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
      AdminAuthMiddleware,
    ];
  }

  static get HandlerCls() {
    return UnbanHandler;
  }

  isMatching(message) {
    if (!message.text) {
      return false;
    }

    return (message.text === `${unbanCar}@${this.bot.info.username}`)
      || (message.text === `${unbanCar}`);
  }
}

module.exports = UnbanCarRoute;
