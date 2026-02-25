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
  subject: "Thank You for Contacting Goyama Solar",
  html: `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
      
      <p>Dear ${safeData.name},</p>

      <p>
        Thank you for contacting <strong>Goyama Solar</strong>.
        We have received your inquiry successfully.
      </p>

      <p>
        Our team will review your request and get back to you within 
        <strong>24 working hours</strong>.
      </p>

      <p>
        If your requirement is urgent, please feel free to contact us directly.
      </p>

      <br/>

      <!-- Signature Section -->
      <div style="border-top:1px solid #e5e5e5; padding-top:15px; margin-top:20px;">
        
        <img 
          src="https://goyama-solar-l98d.vercel.app/logo.png" 
          alt="Goyama Solar Logo" 
          style="max-width:160px; margin-bottom:10px;"
        />

        <p style="margin:5px 0;">
          📞 +91-9466666257 | +91-9896684435
        </p>

        <p style="margin:5px 0;">
          ✉ info@goyamasolar.com
        </p>

        <p style="margin:5px 0;">
          🌐 www.goyamasolar.com
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