const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../middlewares");

const { emailRegexp } = require("../constans/users");

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      mutch: emailRegexp,
      unique: true,
      require: true,
    },
    paswword: {
      type: String,
      minlength: 6,
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = User;
