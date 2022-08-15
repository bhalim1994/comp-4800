"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Question, User, Submission }) {
      // define association here
      this.hasMany(Question, { foreignKey: "surveyId", as: "questions" });
      this.hasMany(Submission, { foreignKey: "surveyId", as: "submissions" });
      this.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Survey.init(
    {
      surveyId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING(3000),
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("Student", "Preceptor", "Graduate", "External"),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Survey",
      tableName: "survey",
    }
  );
  return Survey;
};
