const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/auth.controller");
const MongooseUserRepository = require("../repositories/mongoose.user.repository");
const AuthService = require("../../application/services/auth.service");

const userRepository = new MongooseUserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post("/login", authController.login.bind(authController));
router.post("/register", authController.register.bind(authController));

module.exports = router;
