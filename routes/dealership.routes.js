const express = require("express");
const router = express.Router();
const DealershipController = require("../../controllers/dealership.controller");
const authMiddleware = require("../middleware/auth.middleware");
const MongooseDealershipRepository = require("../repositories/mongoose.dealership.repository");
const DealershipService = require("../../application/services/dealership.service");

const dealershipRepository = new MongooseDealershipRepository();
const dealershipService = new DealershipService(dealershipRepository);
const dealershipController = new DealershipController(dealershipService);

router.post(
  "/",
  authMiddleware("Admin"),
  dealershipController.create.bind(dealershipController)
);
router.get(
  "/:id",
  authMiddleware("Admin"),
  dealershipController.getById.bind(dealershipController)
);
router.get(
  "/",
  authMiddleware("Admin"),
  dealershipController.getAll.bind(dealershipController)
);
router.put(
  "/:id",
  authMiddleware("Admin"),
  dealershipController.update.bind(dealershipController)
);
router.delete(
  "/:id",
  authMiddleware("Admin"),
  dealershipController.delete.bind(dealershipController)
);

module.exports = router;
