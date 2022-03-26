const express = require("express");
const router = express.Router();
const {getMV_entry, getMV_entry_comptable, getMV_entry_regie} = require("../controllers/movementEntry");

// * Get movement entry
router.get("/", getMV_entry)

// * Get movement Entry Comtable
router.get("/comptable", getMV_entry_comptable)

// * Get movement Entry Regie
router.get("/regie", getMV_entry_regie)

module.exports = router;