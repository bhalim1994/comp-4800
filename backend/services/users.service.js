const { User } = require("../models/index");

async function createUser(user) {
  const { firstName, lastName, email, password } = user;

  const createdUser = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  return createdUser;
}

async function getUser(userId) {
  const user = await User.findByPk(userId);
  return user;
}

async function getUsers(params) {
  const options = getAllWhereOptions(params);

  const users = await User.findAll(options);
  return users;
}

async function updateUser(userId, user) {
  const { firstName, lastName, email, password } = user;

  const dbUser = await User.findOne({ where: { userId } });

  if (firstName !== undefined) dbUser.firstName = firstName;
  if (lastName !== undefined) dbUser.lastName = lastName;
  if (email !== undefined) dbUser.email = email;
  if (password !== undefined) dbUser.password = password;

  await dbUser.save();

  return dbUser;
}

async function deleteUser(userId) {
  const user = await User.findOne({ where: { userId } });

  if (user === null) {
    return false;
  } else {
    await user.destroy();
    return true;
  }
}

function getAllWhereOptions(params) {
  const { firstName, email } = params;
  const options = {
    where: {},
  };

  if (firstName !== undefined) options.where.firstName = firstName;
  if (email !== undefined) options.where.email = email;

  return options;
}

module.exports = { createUser, getUser, getUsers, deleteUser, updateUser };
