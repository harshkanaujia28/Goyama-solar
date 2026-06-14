const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  try {
    const { lead, calculator, result } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "goyamasolar@gmail.com",
      replyTo: lead.email,
      subject: `New Solar Calculator Lead - ${lead.name}`,
      html: `
        <h2>New Solar Calculator Lead</h2>

        <p><b>Name:</b> ${lead.name}</p>
        <p><b>Phone:</b> ${lead.phone}</p>
        <p><b>Email:</b> ${lead.email}</p>
        <p><b>City:</b> ${lead.city}</p>

        <hr/>

        <p><b>Monthly Bill:</b> ₹${calculator.monthlyBill}</p>
        <p><b>State:</b> ${calculator.state}</p>
        <p><b>Consumer Type:</b> ${calculator.consumerType}</p>
        <p><b>Panel Type:</b> ${calculator.panelType}</p>
        <p><b>Roof Type:</b> ${calculator.roofType}</p>

        <hr/>

        <p><b>Capacity:</b> ${result.capacity} kW</p>
        <p><b>Monthly Savings:</b> ₹${Math.round(result.monthlySavings)}</p>
        <p><b>Annual Savings:</b> ₹${Math.round(result.annualSavings)}</p>
        <p><b>Payback:</b> ${result.paybackYears} Years</p>

        <p><b>System Cost:</b> ₹${Math.round(result.systemCost)}</p>
        <p><b>Subsidy:</b> ₹${Math.round(result.subsidy)}</p>
        <p><b>Net Investment:</b> ₹${Math.round(result.netInvestment)}</p>
      `,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to send lead",
    });
  }
});

module.exports = router;
