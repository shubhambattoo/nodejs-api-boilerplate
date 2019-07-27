const express = require("express");
require('express-async-errors');
require("dotenv").config();
const env = process.env;
const app = express();

const { mongoose } = require("./db/conn");
const Joi = require('joi');

// route imports
const users = require("./routes/users")

// Middlewares
app.use(express.json());

// Routes
app.use("/api/users", users);

const port = env.PORT || 5000;
app.listen(port, () => {
  console.log("Server Started on " + port);
});
