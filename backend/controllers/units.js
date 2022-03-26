const _ = require("lodash");
const { Unite } = require("../models/unite");

// * Get units
exports.getUnits = async (req, res) => {

    try {
      const units = await Unite.find({}).select("name_unite _id")
      console.log(units)
      res.status(200).json(units);
  
    } catch (err) {
      res.status(404).json({ message: "Erreur !" });
    }
  }

  // * Add Untis 
  exports.addUnit = async (req, res) => {

    // Get from req.body
    const cardBody = _.pick(req.body, [
        "name_unite",
        "adress",
        "phone",
        "obs",
    ]);

    let unite = new Unite({...cardBody})

    try{
        unite = await unite.save();
        res.status(200).json({message: "Unit saved With success"});
    }catch (err){
        console.log(err)
        res.status(400).json({message: "Erreur Happened while adding Units"});
    }
    
  }

  // * Browse Units

  exports.browseUnits = async (req, res)=> {
    try {
      const page = +req.query.page || 1;
      const pageSize = +req.query.limit || 10;
      const items = (page - 1) * pageSize;
  
      const total = await Unite.count();
      const pages = Math.ceil(total / pageSize)
  
      const units = await Unite.find()
        .skip(items)
        .limit(pageSize)
        .sort("-createdAt");

  
      res.status(200).json({ units, total, pages, pageSize });
    } catch (err) {
      res.status(404).json({ message: "There is an error" });
    }    

  }