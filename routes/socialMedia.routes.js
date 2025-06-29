const express = require("express");
const router = express.Router();
const SocialMediaController = require("../../controllers/socialMedia.controller");
const authMiddleware = require("../middleware/auth.middleware");
const MongooseCarRepository = require("../repositories/mongoose.car.repository");
const SocialMediaService = require("../../application/services/socialMedia.service");
const ImageProcessor = require("../../utils/imageProcessor");

const carRepository = new MongooseCarRepository();
const imageProcessor = new ImageProcessor();
const socialMediaService = new SocialMediaService(
  carRepository,
  imageProcessor
);
const socialMediaController = new SocialMediaController(socialMediaService);

router.post(
  "/generate/:carId",
  authMiddleware("Admin"),
  socialMediaController.generatePost.bind(socialMediaController)
);
router.post(
  "/schedule",
  authMiddleware("Admin"),
  socialMediaController.schedulePost.bind(socialMediaController)
);

module.exports = router;
