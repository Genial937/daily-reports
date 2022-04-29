require('dotenv').config()
const nodemailer = require("nodemailer");
(async function run(){
    // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER_EMAIL, // generated ethereal user
      pass: process.env.MAIL_USER_PASSWORD, // generated ethereal password
    },
  });


  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.MAIL_FROM, // sender address
    to: "odenyothadeus@gmail.com, thadeus@peakanddale.com", // list of receivers
    subject: "Daily Report", // Subject line
    text: `Hello world?`, // plain text body
    html: `<b>Hello world?</b>`, // html body
  });

})()