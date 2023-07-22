const express = require("express");

const ctrl = require("../../controllers/authController");

const { schemas } = require("../../schemas/users");

const { authenticate, upload } = require("../../middlewares");

const validateBody = require("../../decorators/validateBody");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.userRegisterSchema),
  ctrl.register
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.repeatEmailVerification
);

router.post("/login", validateBody(schemas.userLoginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatars
);

module.exports = router;
