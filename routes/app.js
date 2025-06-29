const express = require("express");
const helmet = require("helmet");
const rateLimit = require("../src/infrastructure/middleware/rateLimiter.middleware");
const logger = require("./utils/logger");
const carRoutes = require("./infrastructure/routes/car.routes");
const dealershipRoutes = require("./infrastructure/routes/dealership.routes");
const leadRoutes = require("./infrastructure/routes/lead.routes");
const authRoutes = require("./infrastructure/routes/auth.routes");
const socialMediaRoutes = require("./infrastructure/routes/socialMedia.routes");
const path = require("path");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/cars", carRoutes);
app.use("/api/dealerships", dealershipRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/social", socialMediaRoutes);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.statusCode || 500).json({ error: err.message });
});

module.exports = app;
