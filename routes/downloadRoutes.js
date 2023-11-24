const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/resume/:file", (req, res) => {
  console.log("want to download resume")

  res.sendFile(`${req.params.file}`)
});

router.get("/profile/:file", (req, res) => {
  res.sendFile(`${req.params.file}`);
});

module.exports = router;
