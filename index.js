const express = require("express");
require('express-async-errors');
require("dotenv").config();
const env = process.env;
const app = express();

const { mongoose } = require("./db/conn");
const Joi = require('joi');

// route imports
const users = require("./routes/users");

if (!env.JWT_PRIVATE_KEY) {
  console.error('Fatal Error : JWT pvt key not defined');
  process.exit(1)
}

// Middlewares
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

// Routes
app.use("/api/users", users);

app.get("/signup", (req, res) => {
  res.render("index");
});

app.get("/", (req, res) => {
  res.redirect("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", (req, res) => {
  res.render("profile");
})

const port = env.PORT || 5000;
const server = app.listen(port, () => {
  console.log("Server Started on " + port);
});

module.exports = server;