const _ = require("lodash");
const { MovementOut } = require("../models/movement_out");
const { MovementEntry } = require("../models/movement_entry");
const ROLE = require("../permission/roleEnum");

exports.getMV_out =  async (req, res) => {

    try {
        const page = +req.query.page || 1;
        const pageSize = +req.query.limit || 50;
        const items = (page - 1) * pageSize;
    
      // Filter By Season
        const season = req.query.season == "Tous" ? {} : {season: req.query.season};  

        const total = await MovementOut.find(season).count();
        const pages = Math.ceil(total / pageSize)

    
        const mvOut = await MovementOut.find(season)
          .skip(items)
          .limit(pageSize)
          .sort("-createdAt");
    
        res.status(200).json({ mvOut, total, pages, pageSize });
      } catch (err) {
        res.status(404).json({ message: "There is an error" });
      }    
}

exports.getMV_out_comptable = async (req, res) => {

  try {
    const page = +req.query.page || 1;
    const pageSize = +req.query.limit || 50;
    const items = (page - 1) * pageSize;

      
    // Filter By Season
    const season = req.query.season == "Tous" ? {} : {season: req.query.season};  

    const total = await MovementEntry.find({restoredBy: "-", unit: {$ne: "comptable"}, ...season}).count();
    const pages = Math.ceil(total / pageSize)

    const mvOut = await MovementEntry.find({restoredBy: "-", unit: {$ne: "comptable"}, ...season})
        .skip(items)
        .limit(pageSize)
        .sort("-createdAt");
    /*
    // ! IF COMPABLE CAN DELIVER CARDS TO UNITS ALSO.
    const mvOut1 = await MovementEntry.find({restoredBy: "-", unit: {$ne: "comptable"}});
    const mvOut2 = await MovementOut.find({delivredBy: ROLE.COMPTABLE})

    const mvOut = _.concat(mvOut1, mvOut2)
    */

    res.status(200).json({ mvOut, total, pages, pageSize });
  } catch (err) {
    res.status(404).json({ message: "There is an error" });
  } 
}

exports.getMV_out_regie = async (req, res) => {
  
  try {
    const page = +req.query.page || 1;
    const pageSize = +req.query.limit || 50;
    const items = (page - 1) * pageSize;


    // Filter By Season
    const season = req.query.season == "Tous" ? {} : {season: req.query.season};  

    const total = await MovementOut.find({delivredBy: ROLE.REGIE, ...season}).count();
    const pages = Math.ceil(total / pageSize)

    const mvOut = await MovementOut.find({delivredBy: ROLE.REGIE, ...season})
      .skip(items)
      .limit(pageSize)
      .sort("-createdAt");

    res.status(200).json({ mvOut, total, pages, pageSize });
  } catch (err) {
    res.status(404).json({ message: "There is an error" });
  } 
}