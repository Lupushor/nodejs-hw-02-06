const express = require("express");

const ctrl = require("../../controllers/authController");

// const authController = require("../../controllers/authController");

const schemas = require("../../schemas/users");

const { authenticate } = require("../../middlewares");

const validateBody = require("../../decorators/validateBody");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.userRegisterSchema),
  ctrl.register
);

router.post("/login", validateBody(schemas.userLoginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;
