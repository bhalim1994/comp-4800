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
    await queryInterface.bulkInsert("choice", [
      {
        choiceId: "e3946253-48e1-40b9-a85b-ffab0ec04932",
        questionId: "185dd640-b779-486e-a91e-cb9caeff6d73",
        value: "Yes",
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "f2e5bac6-98e0-4a46-b8d0-751244042557",
        questionId: "185dd640-b779-486e-a91e-cb9caeff6d73",
        value: "No",
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "78f497e1-42d0-47e7-82e1-eb9146d7ec35",
        questionId: "185dd640-b779-486e-a91e-cb9caeff6d73",
        value: "Cannot Recall",
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "177095ff-1d9b-4ad4-968b-cf3c7a7a972c",
        questionId: "afe4028f-570d-4fd3-bb69-70b9a2245791",
        value: "Other",
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "7918f9b7-f54d-4653-9fe0-ce6982124b92",
        questionId: "afe4028f-570d-4fd3-bb69-70b9a2245791",
        value: "Disagree",
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "9b9393bd-471e-4a0a-b46d-ad918d9ed833",
        questionId: "afe4028f-570d-4fd3-bb69-70b9a2245791",
        value: "Agree",
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "6fa70840-8d7d-48c5-baee-221ad551fb1b",
        questionId: "afe4028f-570d-4fd3-bb69-70b9a2245791",
        value: "Strongly Agree",
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "bdd08f83-7da2-41b4-91e5-9d6eb926f74e",
        questionId: "de5df6e5-1f13-447a-911f-49a7593c88bc",
        value: "Strongly Disagree",
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "cc720c7b-7bc5-4c13-85d6-74e740f94753",
        questionId: "de5df6e5-1f13-447a-911f-49a7593c88bc",
        value: "Disagree",
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "ac266d43-8ac6-4603-ad69-04ad1802ad7e",
        questionId: "de5df6e5-1f13-447a-911f-49a7593c88bc",
        value: "Agree",
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "e91f2a26-ce76-4aed-88b1-e01a1646086d",
        questionId: "de5df6e5-1f13-447a-911f-49a7593c88bc",
        value: "Strongly Agree",
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "0bdb4b48-407b-41f6-b5ff-16012ce05733",
        questionId: "f933cbef-5cee-4c7e-9908-7845932bb8d6",
        value: "Strongly Disagree",
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "01e91a0b-bd13-4e8e-a837-887b7895c071",
        questionId: "f933cbef-5cee-4c7e-9908-7845932bb8d6",
        value: "Disagree",
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "9eb8adf8-0930-499f-b09b-fd39869b7e4f",
        questionId: "f933cbef-5cee-4c7e-9908-7845932bb8d6",
        value: "Agree",
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "7d3fa873-1fe2-476c-8b15-0775c3b686cb",
        questionId: "f933cbef-5cee-4c7e-9908-7845932bb8d6",
        value: "Strongly Agree",
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "ddb73b3a-95e2-42d5-8602-b2231b7ef68c",
        questionId: "4ce66508-0197-4dd2-91df-f9d3905f60ba",
        value: "Yes",
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "5500e6f6-20e1-4723-9134-2ff4ecd2b297",
        questionId: "4ce66508-0197-4dd2-91df-f9d3905f60ba",
        value: "No",
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "82571283-a604-4ea1-9d01-dbe71282523a",
        questionId: "4095ca5a-e3a4-4788-ba88-d784fd1cfdd2",
        value: "I definetely agree",
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "4ad43bcd-1794-49f9-b5be-1a5786f2f77b",
        questionId: "4095ca5a-e3a4-4788-ba88-d784fd1cfdd2",
        value: "I agree",
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "97ad8b60-365b-4993-aa97-17012d54a847",
        questionId: "4095ca5a-e3a4-4788-ba88-d784fd1cfdd2",
        value: "I don't know",
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "9de9a4d4-0c0a-4404-b3e3-0156d54d67a8",
        questionId: "4095ca5a-e3a4-4788-ba88-d784fd1cfdd2",
        value: "I definetely don't agree",
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        choiceId: "7cf3b40f-8bdb-4651-a3c0-f81e5a4838a5",
        questionId: "4095ca5a-e3a4-4788-ba88-d784fd1cfdd2",
        value: "I don't agree",
        order: 4,
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
    return queryInterface.bulkDelete("choice", null);
  },
};
