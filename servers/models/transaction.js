'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, {
        foreignKey: 'clientId',
        as: 'transactions'
      })
      Transaction.belongsTo(models.Kost, {
        foreignKey: 'kostId',
        as: 'kosts'
      })
    }
  }
  Transaction.init({
    orderId: DataTypes.STRING,
    clientId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    kostId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};