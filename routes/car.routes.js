const express = require("express");
const router = express.Router();
const CarController = require("../../controllers/car.controller");
const authMiddleware = require("../middleware/auth.middleware");
const fileUploadMiddleware = require("../middleware/fileUpload.middleware");
const MongooseCarRepository = require("../repositories/mongoose.car.repository");
const CarService = require("../../application/services/car.service");
// const VinDecoder = require("../../utils/vinDecoder");

const carRepository = new MongooseCarRepository();
// const vinDecoder = new VinDecoder();
const carService = new CarService(carRepository);
const carController = new CarController(carService);

router.post(
  "/",
  authMiddleware("Admin"),
  fileUploadMiddleware,
  carController.create.bind(carController)
);
router.get("/:id", carController.getById.bind(carController));
router.get("/", carController.getAll.bind(carController));
router.put(
  "/:id",
  authMiddleware("Admin"),
  fileUploadMiddleware,
  carController.update.bind(carController)
);
router.delete(
  "/:id",
  authMiddleware("Admin"),
  carController.delete.bind(carController)
);
router.post(
  "/bulk",
  authMiddleware("Admin"),
  carController.bulkUpload.bind(carController)
);

module.exports = router;
