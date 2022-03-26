const express = require("express");
const _ = require("lodash")
const { Card } = require("../models/card");
const { Unite } = require("../models/unite");
const { Client } = require("../models/client");
const router = express.Router();


// * GET Units
router.get("/", async (req, res) =>{

//const units = await Card.find({unit: {$ne: null}}).select("unit -_id").populate("unit", "-cards -_id");

//const units = await Unite.findById("603241a805912753b0a5001e").select("cards -_id");

//const units = await Card.find({status: true, unit:{$ne: null}}).populate("unit")
//let uArr = [];

//units.forEach((u)=> uArr.push([u.unit.name_unite, u.unit._id]))

//const a = await Card.find({status: true}, '-_id').distinct("owner").exec()
//const b = await Unite.find({cards: {$exists: true}, $where: 'this.cards.length > 0'}).select("name_unite").exec()

const clients = await Client.find({}).select("first_name last_name birthday _id")


console.log(clients)
return res.status(200).json(clients)

});


module.exports = router;