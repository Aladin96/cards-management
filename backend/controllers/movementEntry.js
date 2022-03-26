const _ = require("lodash");
const ROLE = require("../permission/roleEnum")
const { MovementEntry } = require("../models/movement_entry");

exports.getMV_entry = async (req, res) => {

    try {
        const page = +req.query.page || 1;
        const pageSize = +req.query.limit || 50;
        const items = (page - 1) * pageSize;
          
        // Filter By Season
        const season = req.query.season == "Tous" ? {} : {season: req.query.season};  

        const total = await MovementEntry.find(season).count();
        const pages = Math.ceil(total / pageSize)

        const mvEntry = await MovementEntry.find(season)
          .skip(items)
          .limit(pageSize)
          .sort("-createdAt");

          console.log("Pages", pages)
    
        res.status(200).json({ mvEntry, total, pages, pageSize });
      } catch (err) {
        res.status(404).json({ message: "There is an error" });
      }    

    
}


// * Get Comptable Movements Entry

exports.getMV_entry_comptable = async(req, res) => {
  try {
    const page = +req.query.page || 1;
    const pageSize = +req.query.limit || 50;
    const items = (page - 1) * pageSize;

     // Filter By Season
     const season = req.query.season == "Tous" ? {} : {season: req.query.season};  

      // Start quering
    
    const restoredByComptable = await MovementEntry.find({ 
      $or: [ { restoredBy: ROLE.COMPTABLE }, { restoredBy: "-" } ], ...season
    }).sort("-createdAt");
    
   const regieEntry = await MovementEntry.find({unit: "regie", restoredBy: "-", ...season}).sort("-createdAt")

   const queryResult = _.differenceWith(restoredByComptable, regieEntry, _.isEqual)

   const total = queryResult.length;
   const pages = Math.ceil(total / pageSize)

   const mvEntry = _(queryResult).slice(items).take(pageSize).value()


    res.status(200).json({ mvEntry, total, pages, pageSize });
  } catch (err) {
    res.status(404).json({ message: "There is an error" });
  } 

}

// * Get Regie Movmenets Entry

exports.getMV_entry_regie = async (req, res) => {

  try {
    const page = +req.query.page || 1;
    const pageSize = +req.query.limit || 1;
    const items = (page - 1) * pageSize;


  // Filter By Season
  const season = req.query.season == "Tous" ? {} : {season: req.query.season}; 

    // Query
    const restoredByRegie = { 
      $or: [ { restoredBy: ROLE.REGIE }, { restoredBy: "-" } ]
    }

    const notEqualComptable = {
      unit: { $ne: ROLE.COMPTABLE }
    }


    // Start quering
    const total = await MovementEntry.find().and([restoredByRegie, notEqualComptable, season]).count();
    const pages = Math.ceil(total / pageSize)

    const mvEntry = await MovementEntry.find().and([restoredByRegie, notEqualComptable, season])
      .skip(items)
      .limit(pageSize)
      .sort("-createdAt");


    res.status(200).json({ mvEntry, total, pages, pageSize });
  } catch (err) {
    res.status(404).json({ message: "There is an error" });
  } 

}