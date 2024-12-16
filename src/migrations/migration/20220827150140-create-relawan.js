'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('relawan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      location: {
        allowNull: true,
        type: Sequelize.STRING(500)
      },
      provinsi: {
        allowNull: true,
        type: Sequelize.STRING(100)
      },
      kabupaten: {
        allowNull: true,
        type: Sequelize.STRING(100)
      },
      kecamatan: {
        allowNull: true,
        type: Sequelize.STRING(100)
      },
      kelurahan: {
        allowNull: true,
        type: Sequelize.STRING(100)
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('relawan');
  }
};