const express = require("express");
const router = express.Router();
const {totalCardsPerUser, totalCardsPie,
     cardsSoldPerColorAndDiscipline, cardsSoldPerDisciplineAndPrice,
     totalCardsSoldPerDisciplineAndPrice, totalCardsPerUnits}  = require("../controllers/statistics");

// * Total Cards per User

router.get("/totalCardsPerUser", totalCardsPerUser);

// * Total Cards PIE

router.get("/totalCardsPie", totalCardsPie)


// * Colors Sold Per Color And Discipline

router.get("/cardsSoldPerColorAndDiscipline", cardsSoldPerColorAndDiscipline)

// * Colors Sold Per Discipline And Price

router.get("/cardsSoldPerDisciplineAndPrice", cardsSoldPerDisciplineAndPrice)

// * Total Colors Sold Per Discipline And Price

router.get("/totalCardsSoldPerDisciplineAndPrice", totalCardsSoldPerDisciplineAndPrice)

// * Total Cards Per Units

router.get("/totalCardsPerUnits", totalCardsPerUnits)

module.exports = router;

