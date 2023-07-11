const express = require("express");
const {
  getAllContacts,
  getContact,
  deleteContact,
  addNewContact,
  updatedContact,
  updateFavorite,
} = require("../../controllers/contactControllers");

const isValidId = require("../../middlewares/isValidId");

const router = express.Router();

router.route("/").get(getAllContacts).post(addNewContact);
router
  .route("/:contactId")
  .get(isValidId, getContact)
  .delete(isValidId, deleteContact)
  .put(isValidId, updatedContact);
router.route("/:contactId/favorite").patch(isValidId, updateFavorite);

module.exports = router;
