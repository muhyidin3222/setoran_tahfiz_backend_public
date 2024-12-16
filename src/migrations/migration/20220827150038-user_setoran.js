'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_setoran', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      id_student: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      id_user_menyimak: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      image: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      id_user: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      id_student_menyimak: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      incorrect: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      nilai: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      id_guide_tahfidz: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      id_level_tahfidz: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      sound: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      message: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      note: {
        allowNull: true,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('user_setoran');
  },
};
