"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Survey, Answer }) {
      // define association here
      this.belongsTo(Survey, {
        foreignKey: "surveyId",
        as: "survey",
      });
      this.hasMany(Answer, {
        foreignKey: "submissionId",
        as: "answers",
      });
    }
  }
  Submission.init(
    {
      submissionId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Submission",
      tableName: "submission",
    }
  );
  return Submission;
};
