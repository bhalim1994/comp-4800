"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Submission, Question }) {
      // define association here
      this.belongsTo(Submission, {
        foreignKey: "submissionId",
        as: "submission",
      });
      this.belongsTo(Question, {
        foreignKey: "questionId",
        as: "question",
      });
    }
  }
  Answer.init(
    {
      submissionId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      questionId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      value: {
        type: DataTypes.STRING(3000),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Answer",
      tableName: "answer",
    }
  );
  return Answer;
};
