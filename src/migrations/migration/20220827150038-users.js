'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING(200),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      step_register: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING(1000),
      },
      id_google: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      photo: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      gender: {
        allowNull: true,
        type: Sequelize.STRING(10),
      },
      fcm_token: {
        allowNull: true,
        type: Sequelize.STRING(1000),
      },
      token: {
        allowNull: true,
        type: Sequelize.STRING(1000),
      },
      date_of_birth: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      about: {
        allowNull: true,
        type: Sequelize.STRING(1000),
      },
      type_user: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      version: {
        allowNull: true,
        type: Sequelize.STRING(10),
      },
      location: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      id_school: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      id_student: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
