const express = require("express");
const { addSeason, getSeason } = require("../controllers/season");
const router = express.Router();

// * Add Season 
router.post("/", addSeason);

// * GET Seasons 
router.get("/", getSeason);

module.exports = router