const _ = require("lodash");
const { Color } = require("../models/color");

// * Get Colors
exports.getColors = async (req, res) => {

    try {
   
      const colors = await Color.find({}, "-_id").distinct("color").exec();
      res.status(200).json(colors);
  
    } catch (err) {
      res.status(404).json({ message: "Erreur !" });
    }
  }

  // * Add Colors 
  exports.addColor = async (req, res) => {

    // Get from req.body
    const color = req.body.color

    let newColor = new Color({color})

    try{
        newColor = await newColor.save();
        res.status(200).json({message: "Color saved With success"});
    }catch (err){
        res.status(400).json({message: "Erreur Happened while adding Colors"});
    }
    
  }