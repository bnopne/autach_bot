const Entity = require('./Entity');
const models = require('../models');
const CarVote = require('./CarVote');
const CarChatMtm = require('./CarChatMtm');

class Car extends Entity {
  static get modelClass() {
    return models.Car;
  }

  static async findById(id) {
    const model = await this.modelClass.findOne({
      where: { id },
    });

    return model ? new this(model) : null;
  }

  static async findActiveForUser(user) {
    const model = await this.modelClass.findOne({
      where: {
        userId: user.id,
        isActive: true,
      },
    });

    if (!model) {
      return null;
    }

    return new this(model);
  }

  static async createActiveForUser(user, telegramImageId) {
    const model = await this.create({
      userId: user.id,
      telegramImageId,
      isActive: true,
    });

    return new this(model);
  }

  get id() {
    return this.model.id;
  }

  get userId() {
    return this.model.userId;
  }

  get telegramImageId() {
    return this.model.telegramImageId;
  }

  setActive() {
    this.model.isActive = true;
    return this.model.save();
  }

  setInactive() {
    this.model.isActive = false;
    return this.model.save();
  }

  async getScore() {
    const votes = await CarVote.getAllForCar(this);

    const likes = votes
      .filter(vote => vote.isLike)
      .length;

    const dislikes = votes
      .filter(vote => vote.isDislike)
      .length;

    return { likes, dislikes };
  }

  async isBannedInChat(chat) {
    const carChatMtm = await CarChatMtm.findForCarInChat(this, chat);
    return carChatMtm ? carChatMtm.isBanned : false;
  }

  async banInChat(chat) {
    let carChatMtm = await CarChatMtm.findForCarInChat(this, chat);

    if (!carChatMtm) {
      carChatMtm = await CarChatMtm.createForCarInChat(this, chat);
    }

    await carChatMtm.ban();
  }

  async unbanInChat(chat) {
    let carChatMtm = await CarChatMtm.findForCarInChat(this, chat);

    if (!carChatMtm) {
      carChatMtm = await CarChatMtm.createForCarInChat(this, chat);
    }

    await carChatMtm.unban();
  }
}

module.exports = Car;
