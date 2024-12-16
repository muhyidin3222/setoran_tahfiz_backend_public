'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('logs', [
      { key: 'log_1', data_log: 100, created_at: new Date() },
      { key: 'log_2', data_log: 200, created_at: new Date() },
    ]);
    await queryInterface.bulkInsert('notification', [
      {
        name: 'Notification 1',
        description: 'Description 1',
        screen: 'screen_1',
        id_berita: null,
        id_setoran: 1,
        id_sertifikat: null,
        id_user: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
    await queryInterface.bulkInsert('payment', [
      {
        transaction_status: 'success',
        status_message: 'Payment completed',
        va: '123456',
        no_bank: '001',
        nama_bank: 'Bank A',
        amount: 1000,
        paid_at: "16-12-2024",
        additionalData: null,
        id_period: 1,
        id_school: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
    await queryInterface.bulkInsert('school', [
      {
        name: 'School A',
        total_student: 100,
        description: 'Top school',
        photo: null,
        id_period: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
    await queryInterface.bulkInsert('period', [
      {
        period_end: '2024-12-31',
        period_start: '2024-01-01',
        month: 12,
        total_price: 5000,
        id_school: 1,
        id_payment: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
    await queryInterface.bulkInsert('user_setoran', [
      {
        id_student: 1,
        id_user_menyimak: 2,
        image: null,
        id_user: 1,
        id_student_menyimak: null,
        incorrect: 0,
        nilai: 95,
        id_guide_tahfidz: 1,
        id_level_tahfidz: 1,
        sound: null,
        message: 'Well done',
        note: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
    await queryInterface.bulkInsert('setudent', [
      {
        full_name: 'John Doe',
        photo: 'https://example.com/photo.jpg',
        parent: 'Jane Doe',
        gender: 'Male',
        email_user: 'john@gmail.com',
        no: 'ST12345',
        date_of_birth: '2005-06-15',
        id_school: 1,
        id_user: 2,
        id_user_class: 3,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
    await queryInterface.bulkInsert('tag', [
      { name: 'Tag A', id_school: 1, created_at: new Date(), updated_at: new Date(), deleted_at: null },
    ]);
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@gmail.com',
        phone: '123456789',
        step_register: 1,
        password: 'hashed_password', // Replace with a hashed password
        id_google: null,
        photo: null,
        gender: 'M',
        fcm_token: null,
        token: null,
        date_of_birth: '1990-01-01',
        about: 'Administrator',
        type_user: 'admin',
        version: '1.0',
        location: null,
        id_school: 1,
        id_student: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
    await queryInterface.bulkInsert('admin_user', [
      { email: 'admin1@school.com', password: 'hashed_password_1', id_school: 1, created_at: new Date(), updated_at: new Date(), deleted_at: null },
    ]);
    await queryInterface.bulkInsert('ustadz_class', [
      {
        id_ustadz: 1,
        id_master_class: 101,
        id_school: 1001,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
    await queryInterface.bulkInsert('user_class', [
      {
        id_student: 1,
        id_master_class: 101,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
    await queryInterface.bulkInsert('master_class', [
      {
        name: 'Class 1A',
        total_student: 30,
        school_year_start: '2023-2024',
        school_year_end: '2024-2025',
        id_school: 1,
        id_wali_kelas: 5,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
    await queryInterface.bulkInsert('level_tahfidz', [
      {
        name: 'Level 1',
        id_school: 1,
        sertifikat_url: 'https://example.com/sertifikat/level1',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
    await queryInterface.bulkInsert('guide_tahfidz', [
      {
        name: 'Guide Tahfidz 1',
        no: 1,
        description: 'Description for Guide Tahfidz 1',
        id_school: 1,
        id_level_tahfidz: 1,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ]);
    await queryInterface.bulkInsert('config', [
      {
        version_android: '1.0.0',
        version_ios: '1.0.0',
        visi: 'Our vision is to provide the best educational experience.',
        misi: 'Our mission is to make learning accessible and enjoyable for everyone.',
        banner1: 'https://example.com/banner1.jpg',
        banner2: 'https://example.com/banner2.jpg',
        banner3: 'https://example.com/banner3.jpg',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('logs', null, {});
    await queryInterface.bulkDelete('notification', null, {});
    await queryInterface.bulkDelete('school', null, {});
    await queryInterface.bulkDelete('period', null, {});
    await queryInterface.bulkDelete('user_setoran', null, {});
    await queryInterface.bulkDelete('setudent', null, {});
    await queryInterface.bulkDelete('tag', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('admin_user', null, {});

  },
};
