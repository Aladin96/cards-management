const express = require("express");
const router = express.Router();
const {filterRestoreCards, restoreCards} = require("../controllers/restore_cards");

// * Filter Restore Cards 
router.get("/filter", filterRestoreCards)

// * Restore Cards
router.post("/", restoreCards);

module.exports = router;
