const express = require("express");

const {
  getAllContacts,
  getContact,
  deleteContact,
  addNewContact,
  updatedContact,
  updateFavorite,
} = require("../../controllers/contactControllers");

const { isValidId, authenticate } = require("../../middlewares");

const validateBody = require("../../decorators/validateBody");

const { schemas } = require("../../schemas/contacts");

const router = express.Router();

router.use(authenticate);

router
  .route("/")
  .get(authenticate, getAllContacts)
  .post(authenticate, validateBody(schemas.addSchema), addNewContact);
router
  .route("/:contactId")
  .get(authenticate, isValidId, getContact)
  .delete(authenticate, isValidId, deleteContact)
  .put(
    authenticate,
    isValidId,
    validateBody(schemas.addSchema),
    updatedContact
  );
router
  .route("/:contactId/favorite")
  .patch(
    authenticate,
    isValidId,
    validateBody(schemas.contactUpdateFavoriteSchema),
    updateFavorite
  );

module.exports = router;
