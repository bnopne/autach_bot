const Route = require('../../../infrastructure/Route');
const DataSaverMiddleware = require('../../middlewares/MessageDataSaverMiddleware');
const AdminAuthMiddleware = require('../../middlewares/AdminAuthMiddleware');
const MessageAgeCheckMiddleware = require('../../middlewares/MessageAgeCheckMiddleware');
const BanHandler = require('./BanCarHandler');
const { banCar } = require('../../../text/commands');

class BanCarRoute extends Route {
  static get middlewareClsList() {
    return [
      DataSaverMiddleware,
      MessageAgeCheckMiddleware,
      AdminAuthMiddleware,
    ];
  }

  static get HandlerCls() {
    return BanHandler;
  }

  isMatching(message) {
    if (!message.text) {
      return false;
    }

    return (message.text === `${banCar}@${this.bot.info.username}`)
      || (message.text === `${banCar}`);
  }
}

module.exports = BanCarRoute;
