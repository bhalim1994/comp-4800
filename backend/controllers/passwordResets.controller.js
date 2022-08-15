const passwordResetsService = require("../services/passwordResets.service.js");
const userService = require("../services/users.service.js");
const emailService = require("../utils/emailService.js");

const SUPPORT_EMAIL = "bsnsurveys@gmail.com";

async function getPasswordReset(req, res) {
  try {
    const { passwordResetId } = req.params;
    const passwordReset = await passwordResetsService.getPasswordReset(
      passwordResetId
    );

    return res.status(200).json(passwordReset);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
}

async function resetPassword(req, res) {
  try {
    const { passwordResetId } = req.params;
    const { password } = req.body;
    const passwordReset = await passwordResetsService.getPasswordReset(
      passwordResetId
    );

    if (passwordReset.completed)
      return res.status(400).send("This link has been used already!");
    if (new Date(passwordReset.expiresAt) < new Date())
      return res.status(400).send("This link has expired!");

    const user = await userService.getUser(passwordReset.userId);
    await userService.updateUser(user.userId, { ...user, password });
    await passwordResetsService.updatePasswordReset(passwordResetId, {
      ...passwordReset,
      completed: true,
    });

    const subject = "BSN Surveys - Your password has changed!";
    const body = `Your BSN Surveys password has changed! If you changed your password, ignore this email. Otherwise, please get in touch with the support team:\n ${SUPPORT_EMAIL}`;

    await emailService.sendEmail(user.email, subject, body);

    return res.status(200).send("Password was reset successfully!");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
}

module.exports = {
  getPasswordReset,
  resetPassword,
};
