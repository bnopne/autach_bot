module.exports = (sequelize, DataTypes) => sequelize.define(
  'Car',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    telegramImageId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    associate: (Car, models) => {
      Car.belongsTo(models.User, { as: 'user' });
    },
  },
);
