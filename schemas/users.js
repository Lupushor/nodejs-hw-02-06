const Joi = require("joi");

const { emailRegexp } = require("../constans/users");

const userRegisterSchema = Joi.object({
  name: Joi.string().require(),
  email: Joi.string().pattern(emailRegexp).require(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  userRegisterSchema,
};
