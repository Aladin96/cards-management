const express = require("express");
const router = express.Router();
const {getColors, addColor} = require("../controllers/colors");

// * Browse Colors
router.get("/name/all", getColors);

// * Add Colors
router.post("/", addColor);



module.exports = router;
