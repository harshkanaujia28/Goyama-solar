const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
require("dotenv").config();

const contactRoute = require("./routes/contact");
const rateLimit = require("./middleware/rateLimit");
const errorHandler = require("./middleware/error");

const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

app.use("/api/contact", rateLimit, contactRoute);

app.use(errorHandler);

module.exports = app;