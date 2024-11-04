'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InvoiceItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoiceId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Invoices',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      itemDescription: {
        type: Sequelize.STRING,
        allowNull:false
      },
      HSNCode: {
        type: Sequelize.STRING,
        allowNull:false
      },
      qty: {
        type: Sequelize.DOUBLE,
        allowNull:false
      },
      unit: {
        type: Sequelize.STRING,
        allowNull:false
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull:false
      },
      total: {
        type: Sequelize.DOUBLE,
        allowNull:false
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
    await queryInterface.dropTable('InvoiceItems');
  }
};