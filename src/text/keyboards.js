const InlineKeyboardMarkup = require('../infrastructure/dto/InlineKeyboardMarkup');
const InlineKeyboardButton = require('../infrastructure/dto/InlineKeyboardButton');
const CallbackData = require('../infrastructure/dto/CallbackData');

const getCarKeyboard = car => InlineKeyboardMarkup.createFromButtons([
  InlineKeyboardButton.createWithCallbackData('👍', CallbackData.createLikeForCar(car)),
  InlineKeyboardButton.createWithCallbackData('👎', CallbackData.createDislikeForCar(car)),
]);

module.exports = {
  getCarKeyboard,
};
