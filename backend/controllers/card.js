const _ = require("lodash");
const { Card } = require("../models/card");
const { MovementEntry } = require("../models/movement_entry");
const ROLE = require("../permission/roleEnum");

// * get all cards 
exports.getCards = async (req, res) => {
 
    try {
      const page = +req.query.page || 1;
      const pageSize = +req.query.limit || 50;
      const items = (page - 1) * pageSize;
  
      const total = await Card.count();
      const pages = Math.ceil(total / pageSize)
  
      const cards = await Card.find()
        .skip(items)
        .limit(pageSize)
        .sort("-createdAt");
  
      res.status(200).json({ cards, total, pages, pageSize });
    } catch (err) {
      res.status(404).json({ message: "No cards" });
    }
  }

  // * Filter Cards 
  exports.filterCards = async (req, res) => {

    // * Get Colors exists in database
    
    if(req.query.accesColor == 1 ){
     
     const colors = await Card.find({status: req.query.status}, '-_id').distinct("color").exec()
     res.status(200).json(colors);
     return;
    }
   
   // * Filter Cards by Colors [ GET DISCIPLINES ]
   
   if(Object.keys(req.query).length == 2 && req.query.color ){
   
     const color = req.query.color
     const status = req.query.status
   
     const disciplines = await Card.find({color, status}, '-_id').distinct("discipline").exec()
     return res.status(200).json(disciplines);
   
    }
   
    // * Get Units who has cards
   
   if(Object.keys(req.query).length == 2 && req.query.accessUnit ){
     const status = req.query.status
     const units = await Card.find({status}, '-_id').distinct("owner").exec()
     console.log(units)
     return res.status(200).json(units);
   
    }
   
    // * Filter by Colors and Disciplines [ GET PRICES ]
   
    if(Object.keys(req.query).length == 3 && req.query.color && req.query.discipline){
   
     const color = req.query.color;
     const discipline = req.query.discipline;
     const status = req.query.status
   
     const prices= await Card.find({color, discipline, status}, "-_id").distinct("price").exec();
     return res.status(200).json(prices);
   
    }
   
   
    // * Filter by Colors and Disciplines and  Prices [ GET Start Date ]
   
    if(Object.keys(req.query).length == 4 && req.query.color && req.query.discipline && req.query.price ){
   
     const color = req.query.color;
     const discipline = req.query.discipline;
     const price = +req.query.price;
     const status = req.query.status
   
     const startDates= await Card.find({color, discipline, price, status}, "-_id").distinct("start_date").exec();
     return res.status(200).json(startDates);
   
    }
    
   
    // * Filter by Colors and Disciplines and Prices and Start Dates [ GET End Date ]
   
    if( Object.keys(req.query).length == 5 
     && req.query.color 
     && req.query.discipline 
     && req.query.price 
     && req.query.start_date
      ){
   
     const color = req.query.color;
     const discipline = req.query.discipline;
     const price = +req.query.price;
     const start_date = req.query.start_date;
     const status = req.query.status
   
     const endDates= await Card.find({color, discipline, price, start_date, status}, "-_id").distinct("end_date").exec();
     return res.json(endDates);
   
    }
   

   // * Filter by Colors and Disciplines and Prices and Start Dates and End Dates [ GET SEASONS ]
   
   if(Object.keys(req.query).length == 6
   && req.query.color
   && req.query.discipline
   && req.query.price 
   && req.query.start_date 
   && req.query.end_date

){

 const color = req.query.color;
 const discipline = req.query.discipline;
 const price = +req.query.price;
 const start_date = req.query.start_date;
 const end_date = req.query.end_date;
 const status = req.query.status

 const seasons = await Card.find({color, discipline, price, start_date, end_date, status}, "-_id").distinct("season").exec();
 return res.json(seasons);

}

    // * Filter by Colors and Disciplines and Prices and Start Dates and End Dates and Seasons [ GET Num Cards ]
   
    if(Object.keys(req.query).length == 7 
       && req.query.color
       && req.query.discipline
       && req.query.price 
       && req.query.start_date 
       && req.query.end_date 
       && req.query.season
   
    ){
   
     const color = req.query.color;
     const discipline = req.query.discipline;
     const price = +req.query.price;
     const start_date = req.query.start_date;
     const end_date = req.query.end_date;
     const season = req.query.season
     const status = req.query.status
   
     console.log("SEASIN3", season)
     const numCards= await Card.find({color, discipline, price, start_date, end_date, season, status}, "-_id").distinct("num_card").exec();
     return res.json(numCards);
   
    }
   
    return res.status(200).json([]);
   
   }

   // * Add Cards 
   exports.addCards =  async (req, res) => {

  
    // ! Check if cards exists.
    const cardExsists = await areCardsExists(req);
  
    if (cardExsists.length > 0)
      return res.status(400).json({ message: "Ces cartes existent déja !" });
  
    // Get from req.body
    const cardBody = _.pick(req.body, [
      "color",
      "price",
      "discipline",
      "start_date",
      "end_date",
      "season"
    ]);
  
    for (let i = +req.body.from; i <= +req.body.to; i++) {
      let card = new Card({ num_card: i, owner: ROLE.COMPTABLE, ...cardBody });
  
      // * Save Cards
      try {
        card = await card.save();
      } catch (err) {
        console.log(err)
        return res.status(400).json({ message: "Oops! une erreur est survenu, ressayer a nouveau" });
      }
    }
  
    // * Save Movements Entry
    const count = (+req.body.to - +req.body.from ) + 1;
    let mvEntry = new MovementEntry({from: +req.body.from, to: +req.body.to, count, unit: ROLE.COMPTABLE, ...cardBody});
  
    try {
      mvEntry = await mvEntry.save();
    }
    catch (err){
      return res.status(400).json({ message: "Oops! une erreur est survenu, ressayer a nouveau" });
    }
  
    res.status(200).json({ message: "Les cartes ont éte bien ajoutées" });
  
  }

  // * Delete Cards

  exports.deleteCard = async (req, res) => {
    try {
      const result = await Card.findByIdAndRemove(req.params.id);
      res.json({ message: "Deleted with success", result });
    } catch (err) {
      res.status(400).json({ message: "Delete fail" });
    }
  }

// Functions

// * Check if cards exists
async function areCardsExists(req, callback) {
    let cardsExists = [];
    const cardBody = _.pick(req.body, [
      "color",
      "price",
      "discipline",
      "start_date",
      "end_date",
      "season"
    ]);
    for (let i = +req.body.from; i <= +req.body.to; i++) {
      const card = await Card.find({ num_card: i, ...cardBody }).sort("num_card");
      if (card.length === 0) break;
      cardsExists.push(card);
    }
    return cardsExists;
  }  