const express = require("express");

const authController = require("../../controllers/authController");

const schemas = require("../../schemas/users");

const validateBody = require("../../decorators/validateBody");

const router = express.Router();

router.post(
  "/singup",
  validateBody(schemas.userRegisterSchema),
  authController.singup
);

router.post(
  "/singin",
  validateBody(schemas.userLoginSchema),
  authController.singin
);

module.exports = router;
