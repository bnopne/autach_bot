const Application = require('../infrastructure/Application');

// message routes
const CarRoute = require('./messageRoutes/CarRoute/CarRoute');
const CheckCarRoute = require('./messageRoutes/CheckCarRoute/CheckCarRoute');
const HelpRoute = require('./messageRoutes/HelpRoute/HelpRoute');
const BanCarRoute = require('./messageRoutes/BanCarRoute/BanCarRoute');
const UnbanCarRoute = require('./messageRoutes/UnbanCarRoute/UnbanCarRoute');

// callback query routes
const LikeRoute = require('./callbackQueryRoutes/LikeRoute/LikeRoute');
const DislikeRoute = require('./callbackQueryRoutes/DislikeRoute/DislikeRoute');

// services
const UserAssistanceService = require('./services/UserAssistanceService');
const MetricsService = require('./services/MetricsService');

class VelachBotApp extends Application {
  static get messageRoutes() {
    return [
      CarRoute,
      CheckCarRoute,
      HelpRoute,
      BanCarRoute,
      UnbanCarRoute,
    ];
  }

  static get callbackQueryRoutes() {
    return [
      LikeRoute,
      DislikeRoute,
    ];
  }

  static get services() {
    return [
      UserAssistanceService,
      MetricsService,
    ];
  }
}

module.exports = VelachBotApp;
