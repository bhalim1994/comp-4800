"use strict";
const { Model, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Survey, PasswordReset }) {
      // define association here
      this.hasMany(Survey, { foreignKey: "surveyId", as: "surveys" });
      this.hasMany(PasswordReset, {
        foreignKey: "passwordResetId",
        as: "passwordResets",
      });
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user",
      hooks: {
        beforeCreate: (user) => generateHash(user),
        beforeUpdate: (user) =>
          includesPassword(user) ? generateHash(user) : user,
      },
    }
  );
  return User;
};

function generateHash(user) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return (user.password = bcrypt.hashSync(user.password, salt));
}

function includesPassword(user) {
  return user.password !== undefined;
}
