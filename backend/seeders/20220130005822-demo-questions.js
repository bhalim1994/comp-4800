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
    await queryInterface.bulkInsert("question", [
      {
        questionId: "185dd640-b779-486e-a91e-cb9caeff6d73",
        surveyId: "9f8c9245-703b-4070-89d9-7d277d72974e",
        description:
          "Are the BCIT Nursing students appropriately oriented and prepared to practise as students in your areas?",
        answerType: "SingleSelect",
        order: 0,
        required: false,
        charLimit: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: "eb400ee6-590f-46f7-98a9-5373307a9fe2",
        surveyId: "9f8c9245-703b-4070-89d9-7d277d72974e",
        description: "[Continuing Question 1] Why?",
        answerType: "LongAnswer",
        order: 1,
        charLimit: 250,
        required: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: "4ce66508-0197-4dd2-91df-f9d3905f60ba",
        surveyId: "9f8c9245-703b-4070-89d9-7d277d72974e",
        description: "[Continuing Question 1] Did you explain why thoroughly?",
        answerType: "SingleSelect",
        order: 2,
        charLimit: null,
        required: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: "afe4028f-570d-4fd3-bb69-70b9a2245791",
        surveyId: "9f8c9245-703b-4070-89d9-7d277d72974e",
        description:
          "Did the BCIT Nursing student practice as part of an Interprofessional team?",
        answerType: "MultiSelect",
        order: 3,
        required: true,
        charLimit: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: "881dc73f-c870-442b-812a-9b2bd4d4474f",
        surveyId: "9f8c9245-703b-4070-89d9-7d277d72974e",
        description: "Explain your answer to the previous question",
        answerType: "LongAnswer",
        order: 4,
        required: false,
        charLimit: 250,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: "de5df6e5-1f13-447a-911f-49a7593c88bc",
        surveyId: "9f8c9245-703b-4070-89d9-7d277d72974e",
        description:
          "Did the BCIT Nursing student engage in safe practice by identifying their own limitations? ",
        answerType: "ShortAnswer",
        order: 5,
        required: true,
        charLimit: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: "f933cbef-5cee-4c7e-9908-7845932bb8d6",
        surveyId: "9f8c9245-703b-4070-89d9-7d277d72974e",
        description:
          "Did the BCIT Nursing student engage in safe practice by seeking help appropriately?",
        answerType: "LongAnswer",
        order: 6,
        charLimit: 250,
        required: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: "4095ca5a-e3a4-4788-ba88-d784fd1cfdd2",
        surveyId: "9f8c9245-703b-4070-89d9-7d277d72974e",
        description:
          '["To what extend do you identify yourself with the following statements?", "First Statement","Second Statement","Third Statement"]',
        answerType: "Matrix",
        order: 7,
        charLimit: null,
        required: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: "ea6c4a05-164f-4210-bb3f-dbaf3bdb3b9f",
        surveyId: "d0a3640f-d415-4ca2-a68b-f8802c6eb6f4",
        description: "This question belongs to Preceptor (High Acuity) survey",
        answerType: "LongAnswer",
        order: 0,
        charLimit: 250,
        required: true,
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
    return queryInterface.bulkDelete("question", null);
  },
};
