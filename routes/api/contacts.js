const express = require("express");

const ctrl = require("../../controllers/contactControllers");

const { isValidId, authenticate } = require("../../middlewares");

const validateBody = require("../../decorators/validateBody");

const { schemas } = require("../../schemas/contacts");

const router = express.Router();

router.use(authenticate);

router
  .route("/")
  .get(authenticate, ctrl.getAllContacts)
  .post(authenticate, validateBody(schemas.addSchema), ctrl.addNewContact);
router
  .route("/:contactId")
  .get(authenticate, isValidId, ctrl.getContact)
  .delete(authenticate, isValidId, ctrl.deleteContact)
  .put(
    authenticate,
    isValidId,
    validateBody(schemas.addSchema),
    ctrl.updatedContact
  );
router
  .route("/:contactId/favorite")
  .patch(
    authenticate,
    isValidId,
    validateBody(schemas.contactUpdateFavoriteSchema),
    ctrl.updateFavorite
  );

module.exports = router;
