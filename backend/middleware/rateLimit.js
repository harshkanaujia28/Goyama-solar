const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // 5 requests per window
  message: {
    message: "Too many requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = (req, res, next) => {
  // 🔥 DO NOT block preflight
  if (req.method === "OPTIONS") {
    return next();
  }

  return limiter(req, res, next);
};