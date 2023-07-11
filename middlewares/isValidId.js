const { isValidObjectId } = require("mongoose");

const HttpError = require("../utils/HttpError");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    next(new HttpError(404, `${contactId} invalid id format`));
  }
  next();
};

module.exports = isValidId;
