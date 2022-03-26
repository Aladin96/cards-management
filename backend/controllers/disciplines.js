const _ = require("lodash");
const { Discipline } = require("../models/discipline");

exports.getDisciplines = async (req, res) => {

    try {
   
      const disciplines = await Discipline.find({}, "-_id").distinct("discipline").exec();
      res.status(200).json(disciplines);
  
    } catch (err) {
      res.status(404).json({ message: "Erreur !" });
    }
  }

  exports.addDiscipline =  async (req, res) => {

    // Get from req.body
    const discipline = req.body.discipline

    console.log(discipline)
 
    let newDiscipline = new Discipline({discipline})

    try{
        newDiscipline = await newDiscipline.save();
        res.status(200).json({message: "Discipline saved With success"});
    }catch (err){
      console.log(err)
        res.status(400).json({message: "Erreur Happened while adding Discipline"});
    }
    
  }

  // * Browse Disciplines

  exports.browseDisciplines = async (req, res) => {
        try {
      const page = +req.query.page || 1;
      const pageSize = +req.query.limit || 10;
      const items = (page - 1) * pageSize;
  
      const total = await Discipline.count();
      const pages = Math.ceil(total / pageSize)
  
      const disciplines = await Discipline.find()
        .skip(items)
        .limit(pageSize)
        .sort("-createdAt");

  
      res.status(200).json({ disciplines, total, pages, pageSize });
    } catch (err) {
      res.status(404).json({ message: "There is an error" });
    }    

  }