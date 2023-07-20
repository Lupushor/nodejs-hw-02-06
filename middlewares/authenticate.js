const jwt = require("jsonwebtoken");

const HttpError = require("../utils/HttpError");

const { User } = require("../models/users");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const { bearer, token } = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(new HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || user.token !== token || !user.token) {
      next(new HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch {
    next(new HttpError(401, "Why?"));
  }
};

module.exports = authenticate;
