module.exports = (err, req, res, next) => {
  console.error(err);

  if (err.message === "CORS Not Allowed") {
    return res.status(403).json({ message: "CORS blocked" });
  }

  res.status(500).json({
    message: "Internal Server Error",
  });
};