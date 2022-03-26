const express = require("express");
const router = express.Router();
const { deliverCards } =require("../controllers/deliver_cards")
const {requireAuth} = require("../middleware/auth")
router.post("/", requireAuth, deliverCards);

module.exports = router;
