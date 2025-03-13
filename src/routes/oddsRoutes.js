const express = require("express");
const { getOdds } = require("../controllers/oddsController");

const router = express.Router();

router.get("/", getOdds);

module.exports = router;
