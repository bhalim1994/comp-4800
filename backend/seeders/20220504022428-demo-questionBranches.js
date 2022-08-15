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
    await queryInterface.bulkInsert("question_branch", [
      {
        choiceId: "f2e5bac6-98e0-4a46-b8d0-751244042557",
        questionId: "eb400ee6-590f-46f7-98a9-5373307a9fe2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "f2e5bac6-98e0-4a46-b8d0-751244042557",
        questionId: "4ce66508-0197-4dd2-91df-f9d3905f60ba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "177095ff-1d9b-4ad4-968b-cf3c7a7a972c",
        questionId: "881dc73f-c870-442b-812a-9b2bd4d4474f",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("question_branch", null);
  },
};
