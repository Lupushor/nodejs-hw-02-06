const { Contact } = require("../models/contact");

const HttpError = require("../utils/HttpError");

const { ctrlWrapper } = require("../decorators");

// const {
//   addSchema,
//   contactUpdateFavoriteSchema,
// } = require("../schemas/contactSchema");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;

  const contacts = await Contact.find(
    { owner },
    "-createdAt -updatedAt"
  ).populate("owner", "email subscription");
  res.json(contacts);
};

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }

  res.json(contact);
};

const addNewContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await Contact.create({ ...req.body, owner });

  res.status(201).json(contact);
};

const updatedContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }

  res.json(contact);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!contact) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }

  res.json(contact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);

  if (!contact) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }
  res.json({ message: "Contact was removed" });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContact: ctrlWrapper(getContact),
  deleteContact: ctrlWrapper(deleteContact),
  addNewContact: ctrlWrapper(addNewContact),
  updatedContact: ctrlWrapper(updatedContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
