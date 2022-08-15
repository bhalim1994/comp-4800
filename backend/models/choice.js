"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Choice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Question, QuestionBranch }) {
      // define association here
      this.belongsTo(Question, {
        foreignKey: "questionId",
        as: "question",
      });
      this.hasMany(QuestionBranch, {
        foreignKey: "choiceId",
        as: "questionBranches",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Choice.init(
    {
      choiceId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      value: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Choice",
      tableName: "choice",
    }
  );
  return Choice;
};
