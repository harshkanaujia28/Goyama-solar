const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");


router.post("/", async (req, res) => {
  try {
    const dns = require("dns").promises;

    const records = await dns.lookup("smtp.gmail.com", {
      all: true,
      family: 4,
    });
    console.log("GMAIL IPV4:", records);
    const { lead, calculator, result } = req.body;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,

      family: 4,

      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log("START SMTP VERIFY");

    await transporter.verify();

    console.log("SMTP VERIFIED");
    console.log("START MAIL SEND");

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
 console.log("MAIL SENT");
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
