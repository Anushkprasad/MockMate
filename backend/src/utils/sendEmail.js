const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // If credentials aren't set up, we print to the console as a fallback and simulate success.
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("\n==================================================");
    console.log("[EMAIL FALLBACK] Nodemailer variables not fully configured.");
    console.log(`TO: ${options.email}`);
    console.log(`SUBJECT: ${options.subject}`);
    console.log("HTML CONTENT:");
    console.log(options.html);
    console.log("==================================================\n");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"MockMate X AI" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
