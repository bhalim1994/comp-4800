const moment = require("moment");

function addHours(date, hours) {
  return moment(date).add(hours, "hours").toDate();
}

function addMinutes(date, minutes) {
  return moment(date).add(minutes, "minutes").toDate();
}

module.exports = {
  addHours,
  addMinutes,
};
