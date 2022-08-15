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
    await queryInterface.bulkInsert("survey", [
      {
        surveyId: "9f8c9245-703b-4070-89d9-7d277d72974e",
        name: "CC Student exit (term 3)",
        description: "this is a student survey for the critical care stream",
        type: "Student",
        userId: "5b79192a-1b53-40b1-a350-9b501d92c2da",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        surveyId: "d0a3640f-d415-4ca2-a68b-f8802c6eb6f4",
        name: "Preceptor (High Acuity)",
        description: "this is a preceptor survey for the high acuity stream",
        type: "Preceptor",
        userId: "5b79192a-1b53-40b1-a350-9b501d92c2da",
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
    return queryInterface.bulkDelete("survey", null);
  },
};
