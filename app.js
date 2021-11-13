require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Email = require("./email");
app.use(express.json());
app.use(cors());
// DATABASE
const DB = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DATABASE CONNECTED...");
  } catch (err) {
    console.log("The WAS AN ERROR WITH CONNECTING DATABASE", err);
  }
};
// SCHEMA
const user = mongoose.Schema({
  username: {
    type: String,
  },
  subject: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
  Date: {
    type: Date,
  },
});
user.pre("save", function (next) {
  this.Date = Date.now();
  next();
});
const UserModel = mongoose.model("porfolio", user);
app.post("/", async (req, res, next) => {
  const { username, email, message, subject } = req.body;
  if (!username || !email || !message || !subject) {
    return res.status(200).json({
      status: "Failed",
      message: "Your didnt Enter the Required Information",
    });
  }
  try {
    await Email(email, message);
    await UserModel.create(req.body);
    return res.status(200).json({
      status: "success",
      message: "Successfully sent",
    });
  } catch (err) {
    return err;
  }
});
app.get("/", (req, res, next) => {
  return res.status(200).send("welcome");
});
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
DB(process.env.DB_STRING);
