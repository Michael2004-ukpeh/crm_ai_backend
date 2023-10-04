const nodemailer = require('nodemailer');
const sendEmail = async (context) => {
  // 1) Create Transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    // secure: process.env.NODE_ENV !== 'development',

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },

    tls: {
      ciphers: 'SSLv3',
    },
  });
  // 2) Define Options
  const mailOptions = {
    from: `${process.env.EMAIL_USER}`,
    to: context.email,
    subject: context.subject,
    text: context.text,
    attachments: context.attachment ? context.attachment : null,
  };
  // 3) Send Email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
