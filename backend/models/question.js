"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Survey, Choice, Answer, QuestionBranch }) {
      // define association here
      this.belongsTo(Survey, {
        foreignKey: "surveyId",
        as: "survey",
      });
      this.hasMany(Choice, {
        foreignKey: "questionId",
        as: "choices",
        onDelete: "CASCADE",
        hooks: true,
      });
      this.hasOne(QuestionBranch, {
        foreignKey: "questionId",
        as: "questionBranch",
        onDelete: "CASCADE",
        hooks: true,
      });
      this.hasMany(Answer, {
        foreignKey: "questionId",
        as: "answers",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Question.init(
    {
      questionId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING(3000),
        allowNull: true,
      },
      answerType: {
        type: DataTypes.ENUM(
          "SingleSelect",
          "MultiSelect",
          "ShortAnswer",
          "LongAnswer",
          "Matrix"
        ),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      required: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      charLimit: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
        },
      },
    },
    {
      sequelize,
      modelName: "Question",
      tableName: "question",
    }
  );
  return Question;
};
