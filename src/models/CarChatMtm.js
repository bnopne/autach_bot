module.exports = (sequelize, DataTypes) => sequelize.define(
  'CarChatMtm',
  {
    carId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    chatId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    associate: (CarChatMtm, models) => {
      CarChatMtm.belongsTo(models.Car, { as: 'car' });
      CarChatMtm.belongsTo(models.Chat, { as: 'chat' });
    },
  },
);
