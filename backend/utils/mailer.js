const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendContactEmail = async (data) => {
  await transporter.sendMail({
    from: `"Website Inquiry" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECEIVER,
    subject: `New Inquiry from ${data.name}`,
    html: `
      <h2>New Contact Inquiry</h2>
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Company:</b> ${data.company || "N/A"}</p>
      <p><b>Phone:</b> ${data.phone}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Message:</b><br/>${data.message}</p>
    `,
  });
};

module.exports = sendContactEmail;