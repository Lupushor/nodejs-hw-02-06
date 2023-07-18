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
const {
  addSchema,
  contactUpdateFavoriteSchema,
} = require("../../schemas/contactSchema");

const router = express.Router();

router.use(authenticate);

router
  .route("/")
  .get(getAllContacts)
  .post(validateBody(addSchema), addNewContact);
router
  .route("/:contactId")
  .get(isValidId, getContact)
  .delete(isValidId, deleteContact)
  .put(isValidId, updatedContact);
router
  .route("/:contactId/favorite")
  .patch(isValidId, validateBody(contactUpdateFavoriteSchema), updateFavorite);

module.exports = router;
