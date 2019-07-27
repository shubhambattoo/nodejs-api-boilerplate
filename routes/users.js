const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

// For testing purposes gets all the users
router.get("/", auth, async (req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.send(users);
});

// gets the current logged in user
router.get("/me", auth, async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
});

// sign up method
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  await user.save();

  const token = user.generateAuthToken();

  user = _.pick(user, ["_id", "name", "email"]);
  user["jwt_token"] = token;

  res.send(user);
});

// login method
router.post("/login", async (req, res) => {
  try {
    const body = _.pick(req.body, ["email", "password"]);
    let user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    user = _.pick(user, ["_id", "name", "email"]);
    user["jwt-token"] = token;
    res.send(user);
  } catch (error) {
    res.status(404).send("Could not find user");
  }
});

module.exports = router;