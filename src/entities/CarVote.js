const Entity = require('./Entity');
const models = require('../models');
const constants = require('./constants');

class CarVote extends Entity {
  static get modelClass() {
    return models.CarVote;
  }

  static async getAllForCar(car) {
    const voteModels = await this.modelClass.findAll({
      where: {
        carId: car.id,
      },
    });

    return voteModels.map(voteModel => new CarVote(voteModel));
  }

  static async getForCarByUser(car, user) {
    const voteModel = await this.modelClass.findOne({
      where: {
        carId: car.id,
        userId: user.id,
      },
    });

    return voteModel ? new CarVote(voteModel) : null;
  }

  static createUpVote(car, user) {
    return this.create({
      userId: user.id,
      carId: car.id,
      points: constants.UPVOTE_POINTS,
    });
  }

  static createDownVote(car, user) {
    return this.create({
      userId: user.id,
      carId: car.id,
      points: constants.DOWNVOTE_POINTS,
    });
  }

  get points() {
    return this.model.points;
  }

  get isLike() {
    return this.points === constants.UPVOTE_POINTS;
  }

  get isDislike() {
    return this.points === constants.DOWNVOTE_POINTS;
  }

  toggleUp() {
    this.model.points = constants.UPVOTE_POINTS;
    return this.model.save();
  }

  toggleDown() {
    this.model.points = constants.DOWNVOTE_POINTS;
    return this.model.save();
  }
}

module.exports = CarVote;
