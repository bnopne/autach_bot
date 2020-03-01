const DTO = require('../DTO');

class CallbackData extends DTO {
  static createLikeForCar(car) {
    const data = new this();
    data.setField('command', 'like');
    data.setField('carId', car.id);
    return data;
  }

  static createDislikeForCar(car) {
    const data = new this();
    data.setField('command', 'dislike');
    data.setField('carId', car.id);
    return data;
  }

  static deserialize(dataString) {
    const rawObject = JSON.parse(dataString);
    return new this(rawObject);
  }

  serialize() {
    return JSON.stringify(this.export());
  }

  get command() {
    return this.getField('command');
  }
}

module.exports = CallbackData;
