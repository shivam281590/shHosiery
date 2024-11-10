'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references:{
          model:'users',
          key:'id'
        },
        onDelete:'RESTRICT'
      },
      customerId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING
      },
      shopName: {
        type: Sequelize.STRING
      },
      gst: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      pinCode: {
        type: Sequelize.INTEGER
      },
      subTotal: {
        type: Sequelize.DOUBLE,
        default:0.00
      },
      sgst: {
        type: Sequelize.DOUBLE,
        default:0.00
      },
      cgst: {
        type: Sequelize.DOUBLE,
        default:0.00
      },
      discount: {
        type: Sequelize.DOUBLE,
        default:0.00
      },
      total: {
        type: Sequelize.DOUBLE,
        default:0.00
      },
      cType: {
        type: Sequelize.ENUM('cash','fixed'),
        allowNull:false
      },
      deletedAt:{
        type:Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Invoices');
  }
};