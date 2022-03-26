const express = require("express");
const router = express.Router();
const { getUnits, addUnit, browseUnits } = require("../controllers/units");


// * Browse Units
router.get("/", browseUnits);

// * GET Units
router.get("/name/all", getUnits);

//* Add unit
router.post("/", addUnit);

module.exports = router;
