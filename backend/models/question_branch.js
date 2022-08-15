"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuestionBranch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Question, Choice }) {
      // define association here
      this.belongsTo(Question, {
        foreignKey: "questionId",
        as: "question",
      });
      this.belongsTo(Choice, {
        foreignKey: "choiceId",
        as: "choice",
      });
    }
  }
  QuestionBranch.init(
    {
      questionId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      choiceId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "QuestionBranch",
      tableName: "question_branch",
    }
  );
  return QuestionBranch;
};
