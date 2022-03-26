const express = require("express");
const router = express.Router();
const {getMV_out, getMV_out_comptable, getMV_out_regie} = require("../controllers/movementOut")

// * GET Movemenet Out
router.get("/", getMV_out);

// * GET Movement Out Comptable
router.get("/comptable", getMV_out_comptable);

// * GET Movement Out Regie
router.get("/regie", getMV_out_regie)

module.exports = router;