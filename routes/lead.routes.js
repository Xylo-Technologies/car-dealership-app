const express = require("express");
const router = express.Router();
const LeadController = require("../../controllers/lead.controller");
const authMiddleware = require("../middleware/auth.middleware");
const MongooseLeadRepository = require("../repositories/mongoose.lead.repository");
const LeadService = require("../../application/services/lead.service");
const EmailSender = require("../../utils/emailSender");

const leadRepository = new MongooseLeadRepository();
const emailSender = new EmailSender();
const leadService = new LeadService(leadRepository, emailSender);
const leadController = new LeadController(leadService);

router.post("/", leadController.create.bind(leadController)); // Public endpoint for contact form
router.get(
  "/:id",
  authMiddleware("Admin"),
  leadController.getById.bind(leadController)
);
router.get(
  "/",
  authMiddleware("Admin"),
  leadController.getAll.bind(leadController)
);
router.put(
  "/:id",
  authMiddleware("Admin"),
  leadController.update.bind(leadController)
);
router.delete(
  "/:id",
  authMiddleware("Admin"),
  leadController.delete.bind(leadController)
);

module.exports = router;
