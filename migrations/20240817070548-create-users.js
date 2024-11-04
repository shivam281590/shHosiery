'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('users',{
      'id':{
        type:Sequelize.BIGINT,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
      },
      'name':{
        type:Sequelize.STRING,
        allowNull:false
      },
      "email":{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      "password":{
        type:Sequelize.STRING,
        allowNull:false,
      },
      "is_admin":{
        type:Sequelize.BOOLEAN,
        defaultValue:0,
        allowNull:false
      },
      "createdAt":{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      },
      "updatedAt":{
        type:Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },{
      timestamps:true
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
