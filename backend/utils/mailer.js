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

<table cellpadding="0" cellspacing="0" 
       style="margin-top:35px; padding-top:20px; border-top:2px solid #f37021; font-family: Arial, sans-serif;">

  <tr>

    <!-- LEFT: LOGO -->
    <td style="vertical-align:top; padding-right:30px;">
      <img 
        src="https://goyama-solar-l98d.vercel.app/goyama.png" 
        alt="Goyama Solar Logo" 
        style="max-width:150px; display:block;"
      />
    </td>

    <!-- ORANGE DIVIDER -->
    <td style="width:2px; background:#cfcfcf;"></td>

    <!-- RIGHT SIDE -->
    <td style="vertical-align:top; padding-left:30px; font-size:14px; line-height:1.8;">

      <p style="margin:0 0 12px 0; font-size:17px; font-weight:700; color:#333;">
        GOYAMA SOLAR
      </p>

      <table cellpadding="0" cellspacing="0">

        <!-- PHONE -->
        <tr>
          <td style="padding-right:8px; vertical-align:middle;">
            <img src="https://cdn-icons-png.flaticon.com/512/597/597177.png"
                 width="14" height="14"
                 style="display:block; filter:brightness(0);" />
          </td>
          <td style="color:#f37021;">
            +91 9466666257 | +91 9896684435
          </td>
        </tr>

        <!-- EMAIL -->
        <tr>
          <td style="padding-right:8px; vertical-align:middle;">
            <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                 width="14" height="14"
                 style="display:block; filter:brightness(0);" />
          </td>
          <td>
            <a href="mailto:info@goyamasolar.com"
               style="color:#f37021; text-decoration:none;">
              info@goyamasolar.com
            </a>
          </td>
        </tr>

        <!-- WEBSITE -->
        <tr>
          <td style="padding-right:8px; vertical-align:middle;">
            <img src="https://cdn-icons-png.flaticon.com/512/535/535239.png"
                 width="14" height="14"
                 style="display:block; filter:brightness(0);" />
          </td>
          <td>
            <a href="https://www.goyamasolar.com"
               style="color:#f37021; text-decoration:none;">
              www.goyamasolar.com
            </a>
          </td>
        </tr>

      </table>

    </td>

  </tr>

</table>
`,
    });
    return { success: true };
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendContactEmail;
