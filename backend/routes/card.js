const express = require("express");
const router = express.Router();
const {getCards, filterCards, addCards, deleteCard} = require("../controllers/card");
const ROLE = require("../permission/roleEnum");
const {requireRole} = require("../middleware/role")

// * Browse Cards

router.get("/", getCards);

// * Filter Cards 

router.get("/filter", filterCards)

// * Add Cards 
router.post("/", [requireRole(ROLE.COMPTABLE)],addCards);


// * Delete Cards
router.delete("/:id", deleteCard);


module.exports = router;
