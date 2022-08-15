const { PasswordReset } = require("../models/index");

async function createPasswordReset(passwordReset) {
  const { userId, completed, expiresAt } = passwordReset;

  const createdPasswordReset = await PasswordReset.create({
    userId,
    completed,
    expiresAt,
  });

  return createdPasswordReset;
}

async function getPasswordReset(passwordResetId) {
  const passwordReset = await PasswordReset.findByPk(passwordResetId);

  return passwordReset;
}

async function updatePasswordReset(passwordResetId, passwordReset) {
  const { completed, expiresAt, userId } = passwordReset;

  const dbPR = await PasswordReset.findOne({ where: { passwordResetId } });

  if (completed !== undefined) dbPR.completed = completed;
  if (expiresAt !== undefined) dbPR.expiresAt = expiresAt;
  if (userId !== undefined) dbPR.userId = userId;

  await dbPR.save();

  return dbPR;
}

module.exports = {
  createPasswordReset,
  getPasswordReset,
  updatePasswordReset,
};
