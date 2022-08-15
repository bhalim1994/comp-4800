const usersService = require("../services/users.service.js");
const emailService = require("../utils/emailService.js");

async function createUser(req, res) {
  try {
    const user = req.body;
    await usersService.createUser(user);

    const subject = "BSN Surveys - Account Created";
    const body =
      "<h4>Your account has been created in the BSN Surveys system.</h4>";
    await emailService.sendEmail(user.email, subject, body);

    return res.status(201).json(user);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function getUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await usersService.getUser(userId);

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function getUsers(req, res) {
  try {
    const users = await usersService.getUsers(req.query);

    return res.status(200).json(users);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function updateUser(req, res) {
  try {
    const user = req.body;
    const { userId } = req.params;
    const updatedUser = await usersService.updateUser(userId, user);

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.userId;
    const deleted = await usersService.deleteUser(userId);

    if (deleted) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);

    return res.status(500).json(err.message);
  }
}

module.exports = {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
};
