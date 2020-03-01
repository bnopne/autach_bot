module.exports = (sequelize, DataTypes) => sequelize.define(
  'CarVote',
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
    carId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    associate: (CarVote, models) => {
      CarVote.belongsTo(models.User, { as: 'user' });
      CarVote.belongsTo(models.Car, { as: 'car' });
    },
  },
);
