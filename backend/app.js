const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
require("dotenv").config();

const contactRoute = require("./routes/contact");
const rateLimit = require("./middleware/rateLimit");
const errorHandler = require("./middleware/error");
const solarLeadRoute = require("./routes/solarLead");

const app = express();

/* ============================
   1️⃣ Security & Core Middleware
============================= */
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));

/* ============================
   2️⃣ CORS Configuration (Dev + Prod Safe)
============================= */

const allowedOrigins = [
  "http://localhost:8080",
  "http://localhost:5173",
  process.env.CLIENT_URL,
  process.env.CLIENT_URL_WWW,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error("CORS Not Allowed: " + origin));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* 🔥 IMPORTANT: Handle Preflight BEFORE routes */
// app.options("/*", cors());

/* ============================
   3️⃣ Routes
============================= */

app.use("/api/contact", rateLimit, contactRoute);
app.use("/api/solar-lead", solarLeadRoute);

/* ============================
   4️⃣ Global Error Handler
============================= */
app.use(errorHandler);

module.exports = app;