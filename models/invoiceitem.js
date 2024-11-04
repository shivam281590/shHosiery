'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InvoiceItem.init({
    invoiceId: DataTypes.INTEGER,
    itemDescription: DataTypes.STRING,
    HSNCode: DataTypes.STRING,
    qty: DataTypes.DOUBLE,
    unit: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    total: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'InvoiceItem'
  });
  return InvoiceItem;
};