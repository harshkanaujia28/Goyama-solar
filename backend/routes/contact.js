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

router.post("/", async (req, res, next) => {
  try {
    const data = contactSchema.parse(req.body);

    await sendContactEmail(data);

    res.status(200).json({
      success: true,
      message: "Inquiry sent successfully",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;