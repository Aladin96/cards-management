const _ = require("lodash");
const { Season } = require("../models/season");

// * Add Season

exports.addSeason = async (req, res) => {
    const { year1, year2 } = req.body;
    console.log(req.body)
    const season = `${year1}/${year2}`;

    // * Check if Season exists in DB
    
    const response = await Season.find({season});
    if(!response)
        return res.status(400).json({message: "Season already Exists !"});

    let newSeason = new Season({season});

    try{
        await newSeason.save();
        return res.status(200).json({message: "Season ajouté avec success", type:"success"});
    }catch(err){
        console.log(err)
        return res.status(400).json({message: "La saison exists deja", type: "danger"});
    }    

}

// * GET Season

exports.getSeason = async (req, res) => {

    try {
        const seasons = await Season.find({}, '-_id').distinct("season").exec()
        res.status(200).json(seasons);
    
      } catch (err) {
        res.status(404).json({ message: "Erreur !" });
      }

}