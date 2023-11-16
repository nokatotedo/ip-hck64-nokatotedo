'use strict';

const { hash } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        email: "pandu@gmail.com",
        password: hash("panduganteng"),
        role: "owner",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    await queryInterface.bulkInsert('UserProfiles', [
      {
        name: "admin",
        phoneNumber: "+6283184628660",
        imgUrl: "https://cdnwpseller.gramedia.net/wp-content/uploads/2022/05/07090859/877766976.jpg",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('UserProfiles', null, {})
  }
};
