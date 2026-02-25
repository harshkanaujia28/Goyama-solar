const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const escapeHtml = (str = "") =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const sendContactEmail = async (data) => {
  try {
    const safeData = {
      name: escapeHtml(data.name),
      company: escapeHtml(data.company || "N/A"),
      phone: escapeHtml(data.phone),
      email: escapeHtml(data.email),
      message: escapeHtml(data.message),
    };

    // Admin email
    await sgMail.send({
      to: process.env.CONTACT_RECEIVER,
      from: "info@goyamasolar.com", // must verify this domain
      subject: `New Inquiry from ${safeData.name}`,
      replyTo: safeData.email,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><b>Name:</b> ${safeData.name}</p>
        <p><b>Company:</b> ${safeData.company}</p>
        <p><b>Phone:</b> ${safeData.phone}</p>
        <p><b>Email:</b> ${safeData.email}</p>
        <p><b>Message:</b><br/>${safeData.message}</p>
      `,
    });

    // Auto reply
    await sgMail.send({
      to: safeData.email,
      from: "info@goyamasolar.com",
      subject: "Thank You for Contacting Us",
      html: `
        <p>Thank you ${safeData.name},</p>
        <p>We received your inquiry and will respond within 24 hours.</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendContactEmail;