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

    await sgMail.send({
      to: safeData.email,
      from: "info@goyamasolar.com",
      subject: "Inquiry Received – Goyama Solar",
      html: `
<div style="font-family: Arial, sans-serif; color:#333; padding:20px;">

  <p style="font-size:16px;">Dear ${safeData.name},</p>

  <p style="font-size:15px; line-height:1.6;">
    Thank you for your interest in <strong>Goyama Solar modules</strong>.
  </p>

  <p style="font-size:15px; line-height:1.6;">
    We have received your inquiry successfully, and our team will share 
    detailed specifications and pricing information within 
    <strong>24 working hours</strong>.
  </p>

  <p style="font-size:15px; line-height:1.6;">
    We appreciate the opportunity to support your requirements and look forward to assisting you.
  </p>

  <p style="margin-top:25px; font-size:15px;">
    Best regards,<br/>
    <strong>Goyama Solar</strong>
  </p>

  <div style="margin-top:30px; border-top:3px solid #f37021; padding-top:20px;">

    <img 
      src="https://goyama-solar-l98d.vercel.app/goyama.png" 
      alt="Goyama Solar Logo" 
      style="max-width:170px; display:block; margin-bottom:15px;"
    />

    <p style="margin:6px 0; font-size:14px;">
      +91-9466666257 | +91-9896684435
    </p>

    <p style="margin:6px 0; font-size:14px;">
      <a href="mailto:info@goyamasolar.com" style="color:#f37021; text-decoration:none;">
        info@goyamasolar.com
      </a>
    </p>

    <p style="margin:6px 0; font-size:14px;">
      <a href="https://www.goyamasolar.com" style="color:#f37021; text-decoration:none;">
        www.goyamasolar.com
      </a>
    </p>

  </div>

</div>
`,
    });
    return { success: true };
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendContactEmail;
