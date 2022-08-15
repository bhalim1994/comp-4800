const nm = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

async function sendEmail(email, subject, body) {
  const transporter = nm.createTransport(
    smtpTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "bsnsurveys@gmail.com",
        pass: "eophffzodoequadn",
      },
    })
  );

  const mailOptions = {
    from: "bsnsurveys@gmail.com",
    to: email,
    subject,
    html: body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: ", info);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  sendEmail,
};
