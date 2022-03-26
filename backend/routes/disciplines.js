const express = require("express");
const router = express.Router();
const { getDisciplines, addDiscipline, browseDisciplines} = require("../controllers/disciplines")

// * GET Discipline
router.get("/name/all", getDisciplines);

// * Browse Disciplines 

router.get("/", browseDisciplines);

// * Add Discipline
router.post("/", addDiscipline);



module.exports = router;
