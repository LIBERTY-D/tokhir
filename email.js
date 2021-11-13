const nodemailer = require("nodemailer");

async function Email(email, message) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });

  // send mail with defined transport object
  try {
    await transporter.sendMail({
      from: email, // sender address
      to: process.env.email, // list of receivers
      subject: "New User", // Subject line
      text: message, // plain text body
      html: `<p">${message}</p>`,
    });
  } catch (err) {
    console.log(err);
  }
}
module.exports = Email;
