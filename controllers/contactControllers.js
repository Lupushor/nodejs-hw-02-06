const Contact = require("../models/contact");

const { HttpError } = require("../utils/HttpError");

const { ctrlWrapper } = require("../decorators");

// const {
//   addSchema,
//   contactUpdateFavoriteSchema,
// } = require("../schemas/contactSchema");

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();
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
  const contact = await Contact.create(req.body);

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

// const getAllContacts = async (req, res, next) => {
//   try {
//     const contacts = await Contact.find();
//     res.json(contacts);
//   } catch (error) {
//     next(error);
//   }
// };

// const getContact = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;

//     const contact = await Contact.findById(contactId);

//     if (!contact) {
//       throw new HttpError(404, `Contact with ${contactId} not found`);
//     }

//     res.json(contact);
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteContact = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const contact = await Contact.findByIdAndDelete(contactId, req.body);

//     res.json({ message: "Contact was removed" });

//     if (!contact) {
//       throw new HttpError(404, "Not Found");
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// const addNewContact = async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw new HttpError(400, error.message);
//     }
//     const contact = await Contact.create(req.body);

//     res.json(contact);
//   } catch (error) {
//     next(error);
//   }
// };

// const updatedContact = async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     if (error) {
//       throw new HttpError(400, error.message);
//     }

//     const { contactId } = req.params;
//     const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
//       new: true,
//     });

//     res.json(contact);
//   } catch (error) {
//     next(error);
//   }
// };

// const updateFavorite = async (req, res, next) => {
//   try {
//     const { error } = contactUpdateFavoriteSchema.validate(req.body);
//     if (error) {
//       throw new HttpError(400, error.message);
//     }

//     const { contactId } = req.params;
//     const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
//       new: true,
//     });

//     res.json(contact);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContact: ctrlWrapper(getContact),
  deleteContact: ctrlWrapper(deleteContact),
  addNewContact: ctrlWrapper(addNewContact),
  updatedContact: ctrlWrapper(updatedContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
