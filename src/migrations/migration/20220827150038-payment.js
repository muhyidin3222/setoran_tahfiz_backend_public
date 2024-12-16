'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payment', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      transaction_status: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      status_message: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      va: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      no_bank: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      nama_bank: {
        allowNull: true,
        type: Sequelize.STRING(10),
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      paid_at: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      additionalData: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      id_period: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      id_school: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('payment');
  },
};
