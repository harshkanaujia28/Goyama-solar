const express = require("express");
const router = express.Router();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { lead, calculator, result } = req.body;

    const { data, error } = await resend.emails.send({
      from: "Goyama Solar <info@goyamasolar.com>",
      to: [process.env.CONTACT_RECEIVER],
      replyTo: lead.email,
      subject: `⚡ New Solar Calculator Lead - ${lead.name}`,

      html: `
        <h2>⚡ New Solar Calculator Lead</h2>

        <h3>Customer Details</h3>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>City:</strong> ${lead.city}</p>

        <hr />

        <h3>Calculator Inputs</h3>
        <p><strong>Monthly Bill:</strong> ₹${calculator.monthlyBill}</p>
        <p><strong>State:</strong> ${calculator.state}</p>
        <p><strong>Consumer Type:</strong> ${calculator.consumerType}</p>
        <p><strong>Panel Type:</strong> ${calculator.panelType}</p>
        <p><strong>Roof Type:</strong> ${calculator.roofType}</p>

        <hr />

        <h3>Solar Recommendation</h3>
        <p><strong>Recommended Capacity:</strong> ${result.capacity} kW</p>
        <p><strong>Monthly Savings:</strong> ₹${Math.round(
          result.monthlySavings
        )}</p>
        <p><strong>Annual Savings:</strong> ₹${Math.round(
          result.annualSavings
        )}</p>
        <p><strong>Payback Period:</strong> ${result.paybackYears} Years</p>

        <hr />

        <h3>Financial Summary</h3>
        <p><strong>System Cost:</strong> ₹${Math.round(
          result.systemCost
        )}</p>
        <p><strong>Subsidy:</strong> ₹${Math.round(
          result.subsidy
        )}</p>
        <p><strong>Net Investment:</strong> ₹${Math.round(
          result.netInvestment
        )}</p>

        <hr />

        <p><strong>Lead Generated:</strong> ${new Date().toLocaleString(
          "en-IN"
        )}</p>
      `,
    });

    if (error) {
      console.error("SOLAR LEAD RESEND ERROR:", error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    console.log("SOLAR LEAD SENT:", data?.id);

    return res.status(200).json({
      success: true,
      message: "Lead submitted successfully",
    });
  } catch (error) {
    console.error("SOLAR LEAD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send lead",
    });
  }
});

module.exports = router;