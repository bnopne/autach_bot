const Entity = require('./Entity');
const models = require('../models');

class CarChatMtm extends Entity {
  static get modelClass() {
    return models.CarChatMtm;
  }

  static async findForCarInChat(car, chat) {
    const model = await this.modelClass.findOne({
      where: {
        carId: car.id,
        chatId: chat.id,
      },
    });

    return model ? new this(model) : null;
  }

  static createForCarInChat(car, chat) {
    return this.create({
      carId: car.id,
      chatId: chat.id,
    });
  }

  get isBanned() {
    return this.model.isBanned;
  }

  ban() {
    this.model.isBanned = true;
    return this.model.save();
  }

  unban() {
    this.model.isBanned = false;
    return this.model.save();
  }
}

module.exports = CarChatMtm;
