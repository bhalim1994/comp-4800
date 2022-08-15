"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    // await queryInterface.bulkInsert("answer", [
    //   {
    //     submissionId: "6c206948-37f6-43b7-8433-bc3e9c3ec161",
    //     questionId: "185dd640-b779-486e-a91e-cb9caeff6d73",
    //     value: "Yes",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     submissionId: "6c206948-37f6-43b7-8433-bc3e9c3ec161",
    //     questionId: "afe4028f-570d-4fd3-bb69-70b9a2245791",
    //     value: '["Agree", "Disagree"]',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     submissionId: "6c206948-37f6-43b7-8433-bc3e9c3ec161",
    //     questionId: "de5df6e5-1f13-447a-911f-49a7593c88bc",
    //     value: "This is my short answer to the short question.",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     submissionId: "6c206948-37f6-43b7-8433-bc3e9c3ec161",
    //     questionId: "f933cbef-5cee-4c7e-9908-7845932bb8d6",
    //     value: "This is my long answer to the long question.",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("answer", null);
  },
};
