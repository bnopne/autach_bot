const Application = require('../infrastructure/Application');

// message routes
const CarRoute = require('./messageRoutes/CarRoute/CarRoute');
const SetCarRoute = require('./messageRoutes/SetCarRoute/SetCarRoute');
const HelpRoute = require('./messageRoutes/HelpRoute/HelpRoute');
const BanCarRoute = require('./messageRoutes/BanCarRoute/BanCarRoute');
const UnbanCarRoute = require('./messageRoutes/UnbanCarRoute/UnbanCarRoute');

// callback query routes
const LikeRoute = require('./callbackQueryRoutes/LikeRoute/LikeRoute');
const DislikeRoute = require('./callbackQueryRoutes/DislikeRoute/DislikeRoute');

// services
const UserAssistanceService = require('./services/UserAssistanceService');
const MetricsService = require('./services/MetricsService');

class AutachBotApp extends Application {
  static get messageRoutes() {
    return [
      CarRoute,
      SetCarRoute,
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

module.exports = AutachBotApp;
