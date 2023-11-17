'use strict';

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
    await queryInterface.bulkInsert('Kosts', [
      {
        name: 'Ruangan A',
        address: 'Jl. Tanah Kusir 4',
        description: 'Kost mantap!!!',
        ownerId: 1,
        slot: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        price: 800000,
        status: "off"
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
    await queryInterface.bulkDelete('Kosts', null, {})
  }
};
