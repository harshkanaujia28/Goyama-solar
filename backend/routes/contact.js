const express = require("express");
const { z } = require("zod");
const sendContactEmail = require("../utils/mailer");

const router = express.Router();

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  company: z.string().max(100).optional(),
  phone: z.string().min(1).max(20),
  email: z.string().email().max(255),
  message: z.string().min(1).max(2000),
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    await sendContactEmail(data);

    return res.status(200).json({
      success: true,
      message:
        "Thank you for contacting Goyama Solar. Our team will get back to you shortly.",
    });

  } catch (error) {

    console.error("Email Error:", error);

    return res.status(503).json({
      success: false,
      message:
        "We're currently unable to process your inquiry. Please try again later or email us directly at info@goyamasolar.com.",
    });

  }
});

module.exports = router;
