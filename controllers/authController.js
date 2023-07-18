const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

const { HttpError } = require("../utils/HttpError");

const { ctrlWrapper } = require("../decorators");

const { SECRET_KEY } = process.env;

const singup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new HttpError(409, "Email is already in use");
  }

  const hachPassword = await bcrypt.hach(password, 10);

  const newUser = await User.create({ ...req.body, password: hachPassword });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const singin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(401);
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new HttpError(401);
  }

  // const { _id: id } = user;

  const payload = {
    id: user._id,
  };

  const token = jwt.sing(payload, SECRET_KEY, { expiresIn: "23" });
  // await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
  });
};

// const getCurrent = async (req, res) => {
//   const { name, email } = req.user;
//   res.json({
//     name,
//     email,
//   });
// };

// const logout = async (req, res) => {
//   const { _id } = req.user;
//   await User.findByIdAndUpdate(_id, { token: "" });

//   res.json({
//     message: "Logout succses",
//   });
// };

module.exports = {
  singup: ctrlWrapper(singup),
  singin: ctrlWrapper(singin),
  // getCurrent: ctrlWrapper(getCurrent),
  // logout: ctrlWrapper(logout),
  // singup,
};
