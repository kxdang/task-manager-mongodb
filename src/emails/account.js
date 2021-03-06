const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ikien.danggmail.com",
    subject: "Welcome to the app!",
    text: `Welcome to the app, ${name}.Let me know how you get along with the app.`
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ikien.dang@gmail.com",
    subject: "Sorry to see you go",
    text: `Hi ${name}, sorry to see you go, please let us know how we can improve our services!`
  });
};
module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail
};
