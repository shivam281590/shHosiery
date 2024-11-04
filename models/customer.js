'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    mobile: DataTypes.INTEGER,
    email: DataTypes.STRING,
    shopName: DataTypes.STRING,
    gst: DataTypes.STRING,
    address: DataTypes.TEXT,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    pinCode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Customer',
    paranoid:true,
    timestamps:true
  });
  return Customer;
};