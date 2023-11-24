const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passportConfig = require("./lib/passportConfig");
const nodemailer=require('nodemailer');
const { v4: uuidv4 } = require("uuid");
var cors = require("cors");
const fs = require("fs");

require("dotenv").config()


const db = require('./config/keys').mongoURI;
mongoose
  .connect( db,{ useNewUrlParser: true ,useUnifiedTopology: true, useFindAndModify: false})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
if (!fs.existsSync("./public/resume")) {
  fs.mkdirSync("./public/resume");
}
if (!fs.existsSync("./public/profile")) {
  fs.mkdirSync("./public/profile");
}

const app = express();
const port = process.env.PORT || 4444;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cors());
app.use(express.json());
app.use(passportConfig.initialize());

app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/host", require("./routes/downloadRoutes"));

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
