'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.hasMany(models.InvoiceItem, { foreignKey: 'invoiceId', as: 'items' });
    }
  }
  Invoice.init({
    userId: DataTypes.BIGINT,
    customerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    shopName: DataTypes.STRING,
    gst: DataTypes.STRING,
    address: DataTypes.TEXT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    pinCode: DataTypes.INTEGER,
    subTotal:DataTypes.DOUBLE,
    sgst:DataTypes.DOUBLE,
    cgst:DataTypes.DOUBLE,
    discount:DataTypes.DOUBLE,
    total:DataTypes.DOUBLE,
    cType: {
      type: DataTypes.ENUM,
      values: ['cash','fixed'] // Add your ENUM values here
    }
  }, {
    sequelize,
    modelName: 'Invoice',
    paranoid:true,
    timestamps:true
  });
  return Invoice;
};