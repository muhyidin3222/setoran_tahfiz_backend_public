'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('config', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      version_android: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      version_ios: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      visi: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      misi: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      banner1: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      banner2: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      banner3: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: true,
        type: Sequelize.STRING, // Type used as per the model, typically DATE would be more appropriate
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.STRING, // Type used as per the model, typically DATE would be more appropriate
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.STRING, // Type used as per the model, typically DATE would be more appropriate
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('config');
  },
};
