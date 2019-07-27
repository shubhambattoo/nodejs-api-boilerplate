const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    }
  },
  { timestamps: true }
);

/**
 * Has password before saving the user
 * @async
 */
userSchema.pre("save", async function(next) {
  try {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * @description Create JWT tokens for user
 */
userSchema.methods.generateAuthToken = function() {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "24h"
  });
  return token;
};

/**
 * Helper class method to login
 */
userSchema.statics.findByCredentials = async function(email, password) {
  try {
    const User = this;
    const user = await User.findOne({ email });

    if (!user) {
      return Promise.reject();
    }

    const check = await bcrypt.compare(password, user.password);
    return check && user;
  } catch (error) {
    return Promise.reject();
  }
};

const User = mongoose.model("User", userSchema);

/**
 * Validates the user object sent to API
 * @param user object of the user
 */
function validate(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
      .max(50),
    email: Joi.string()
      .min(3)
      .required()
      .max(255)
      .email(),
    password: Joi.string()
      .min(3)
      .required()
      .max(1024)
  };

  return Joi.validate(user, schema);
}

module.exports = {
  User,
  validate
};
