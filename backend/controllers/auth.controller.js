const getUsers = require("../services/users.service.js").getUsers;
const usersService = require("../services/users.service.js");
const passwordResetsService = require("../services/passwordResets.service.js");
const jwtGenerator = require("../utils/jwtGenerator.js");
const bcrypt = require("bcrypt");
const { addMinutes } = require("../utils/timeHelper");
const emailService = require("../utils/emailService.js");

const loginErrMsg = "Password or Email is incorrect";

async function login(req, res) {
  try {
    const user = req.body;

    const users = await getUsers({ email: user.email });

    if (users.length === 0) {
      return res.status(401).send(loginErrMsg);
    }

    const { password } = user;

    const validPassword = await bcrypt.compare(password, users[0].password);

    if (!validPassword) {
      return res.status(401).send(loginErrMsg);
    }

    const token = jwtGenerator(users[0].dataValues);

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(401).json(err.message);
  }
}

async function resetPassword(req, res) {
  try {
    const { email } = req.body;

    const users = await usersService.getUsers({ email });

    // One account found
    const user = users[0];
    const passwordReset = {
      userId: user.userId,
      completed: false,
      expiresAt: addMinutes(new Date(), 30),
    };

    const passReset = await passwordResetsService.createPasswordReset(
      passwordReset
    );

    const subject = "BSN Surveys Reset Password";
    const passResetLink = `${process.env.REACT_APP_URL}/reset-password/${passReset.passwordResetId}`;
    const body = `A request has been received to change your password. To reset your password, click on the following link: <a href="${passResetLink}">${passResetLink}</a><p>For security purposes, the link will expire in 30 minutes.</p>`;

    await emailService.sendEmail(user.email, subject, body);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);

    // For extra security, returning 200 even if there's an error finding a user
    return res.sendStatus(200);
  }
}

module.exports = {
  login,
  resetPassword,
};
