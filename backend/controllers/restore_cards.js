const _ = require("lodash");
const { Card } = require("../models/card");
const { Unite } = require("../models/unite");
const { MovementEntry } = require("../models/movement_entry");
const ROLE = require("../permission/roleEnum");
const {isComptable} =  require("../permission/role");
const { Client } = require("../models/client");

//* Filter Restore Cards

exports.filterRestoreCards = async (req, res) => {

    

    const checkComptable = isComptable(req.user);
   

    // * Get Units who has cards delivred

    if(Object.keys(req.query).length == 2 && req.query.access ){
      const status = req.query.status;
      let owners;

      if(req.query.access === "unit"){
        owners = checkComptable ? ["regie"] :  await Unite.find({cards: {$exists: true}, $where: 'this.cards.length > 0'}).select("name_unite").exec();
      }

      if(req.query.access === "client"){
        owners = checkComptable ? ["regie"] :  await Client.find({cards: {$exists: true}, $where: 'this.cards.length > 0'}).select("first_name last_name birthday").exec();
      }
     
      return res.status(200).json(owners);
    
     }

       
   // * Filter Cards by Units [ GET COLORS ]
   
   if(Object.keys(req.query).length == 2 && req.query.unit ){
   
     const owner = req.query.unit
     const status = req.query.status
    console.log(owner)
     const colors = checkComptable ? await Card.find({owner, status: false}, '-_id').distinct("color").exec() : await Card.find({owner, status}, '-_id').distinct("color").exec()
     console.log(colors)
     return res.status(200).json(colors);
   
    }
   
  
   
    // * Filter by Units and Colors  [ GET DISCIPLINES ]
   
    if(Object.keys(req.query).length == 3 && req.query.color && req.query.unit){
   
     const color = req.query.color;
     const owner = req.query.unit;
     const status = req.query.status
   
     const disciplines =  checkComptable ? await Card.find({color, owner, status: false}, '-_id').distinct("discipline").exec() :  await Card.find({color, owner, status}, "-_id").distinct("discipline").exec();
     return res.status(200).json(disciplines);
   
    }
   
   
    // * Filter by Units and Colors and Disciplines [ GET PRICES ]
   
    if(Object.keys(req.query).length == 4 && req.query.color && req.query.discipline && req.query.unit ){
   
     const color = req.query.color;
     const discipline = req.query.discipline;
     const owner = req.query.unit;
     const status = req.query.status
   
     const prices = checkComptable ? await Card.find({color, discipline, owner, status: false}, '-_id').distinct("price").exec() : await Card.find({color, discipline, owner, status}, "-_id").distinct("price").exec();
     return res.status(200).json(prices);
   
    }
    
  
     // * Filter by Units and Colors and Disciplines and Prices [ GET STARTDATE ]
   
    if( Object.keys(req.query).length == 5 
     && req.query.color 
     && req.query.discipline 
     && req.query.price 
     && req.query.unit
      ){
   
     const color = req.query.color;
     const discipline = req.query.discipline;
     const price = +req.query.price;
     const owner = req.query.unit;
     const status = req.query.status
   
     const startDates= checkComptable ? await Card.find({color, discipline, price, owner, status: false}, '-_id').distinct("start_date").exec() : await Card.find({color, discipline, price, owner, status}, "-_id").distinct("start_date").exec();
     return res.json(startDates);
   
    }
       // * Filter by Units and Colors and Disciplines and Prices and StartDates [ GET END DATES ]
   
       if( Object.keys(req.query).length == 6 
       && req.query.color 
       && req.query.discipline 
       && req.query.price 
       && req.query.start_date
       && req.query.unit
        ){
     
       const color = req.query.color;
       const discipline = req.query.discipline;
       const price = +req.query.price;
       const owner = req.query.unit;
       const start_date = req.query.start_date;
       const status = req.query.status
     
       const endDates= checkComptable ? await Card.find({color, discipline, price, start_date, owner, status: false}, '-_id').distinct("end_date").exec() : await Card.find({color, discipline, price, owner, start_date, status}, "-_id").distinct("end_date").exec();
       return res.json(endDates);
     
      }
  

    // * Filter by Units and Colors and Disciplines and Prices and StartDates and EndDates [ GET SEASONS ]

    if( Object.keys(req.query).length == 7 
    && req.query.color 
    && req.query.discipline 
    && req.query.price 
    && req.query.start_date
    && req.query.end_date
    && req.query.unit
    ){

    const color = req.query.color;
    const discipline = req.query.discipline;
    const price = +req.query.price;
    const owner = req.query.unit;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    const status = req.query.status
  
    const seasons = checkComptable ? await Card.find({color, discipline, price, start_date, end_date, owner, status: false}, '-_id').distinct("season").exec() : await Card.find({color, discipline, price, owner, start_date, end_date, status}, "-_id").distinct("season").exec();
    return res.status(200).json(seasons);
  
  }
   
    // * Filter by Unirs and Colors and Disciplines and Prices and Start Dates and End Dates and Seasons [ GET Num Cards ]
   
    if(Object.keys(req.query).length == 8 
       && req.query.color
       && req.query.discipline
       && req.query.price 
       && req.query.start_date 
       && req.query.end_date 
       && req.query.season
       && req.query.unit
   
    ){
  
    
   
     const owner = req.query.unit;
     const color = req.query.color;
     const discipline = req.query.discipline;
     const price = +req.query.price;
     const start_date = req.query.start_date;
     const end_date = req.query.end_date;
     const season = req.query.season;
     const status = req.query.status
   
     const numCards= checkComptable ? await Card.find({color, discipline, price, start_date, end_date, season, owner, status: false}, '-_id').distinct("num_card").exec() : await Card.find({color, discipline, price, owner, start_date, end_date, season, status}, "-_id").distinct("num_card").exec();
     return res.json(numCards);
   
    }
   
    return res.status(200).json([]);
   
   }

// * Restore Cards

exports.restoreCards = async (req, res) => {

     // * Get from req.body

     const cardBody = _.pick(req.body, [
      "color",
      "price",
      "discipline",
      "start_date",
      "end_date",
      "season"
    ]);
    const [owner, ownerID, cardsFrom] = req.body.unit.split("|");

    //  ! Check if cards NOT exists.
    const cardExsists = await areCardsExists(req);
  
    if (cardExsists.length == 0)
      return res.status(400).json({ message: "Ces CARTES n'existent pas !" });

    // ! Comptable restore cards From Regie

    if( req.user.role === ROLE.COMPTABLE && owner === ROLE.REGIE ){

      const status = await isRegieHasCards(req.body.from, req.body.to, cardBody);
      
      if(status){
        return comptableRestoreFromRegie(req.body.from, req.body.to, cardBody, req, res);
      }else{
        return res.status(400).json({message: "You cant restore these cards From regies because they are in other units or already you have these cards"});
      }
    }
  
    // ! Check if cards aren't delivred
  
    const cardsDelivred  = await arentDelivred(req);
    if(cardsDelivred)
      return res.status(400).json({message: "You cant restore a card not delivred YET ! "});
  
  
    // * Ready to Restore cards

  
   for (let i = +req.body.from; i <= +req.body.to; i++) {

    // * Restore Cards From UNITS
    if(cardsFrom === "unit"){
    
      const card = await Card.findOneAndUpdate({num_card: i,owner, ...cardBody}, { $set: {status: false, owner: req.user.role }, $unset: { 'unit': ''} });


      // * Delete Card From Unite Model
      const unit = await Unite.findById(card.unit);
      unit.restoreCards(card._id)
      await unit.save();
    }

    // * Restore Cards From CLIENTS

    if(cardsFrom === "client"){
      const card = await Card.findOneAndUpdate({num_card: i,owner, ...cardBody}, { $set: {status: false, owner: req.user.role }, $unset: { 'client': ''}});

      // * Delete Card From Client Model
      const client = await Client.findById(card.client);
      client.restoreCards(card._id)
      await client.save();
    }

      
    }

    // * Save Movements Entry
    const count = (+req.body.to - +req.body.from ) + 1;
    let mvEntry = new MovementEntry({from: +req.body.from, to: +req.body.to, count, unit: owner, ...cardBody, restoredBy: req.user.role});
  
    try {
      mvEntry = await mvEntry.save();
    }
    catch (err){
      console.log(err);
      return res.status(400).json({ message: "Something wrong happened" });
    }
  
    res.status(200).json({ message: "Cards retored with success" });
  }

  // Functions

/* Check if cards exists */

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
  
  /* Check if cards aren't delivred */
  
  async function arentDelivred(req, callback){
    let cardsarentDelivred = false;
    const cardBody = _.pick(req.body, [
      "color",
      "price",
      "discipline", 
      "start_date",
      "end_date",
      "season",
      "status"  ]);
  
      for(let i= +req.body.from; i<= +req.body.to; i++){
  
        const card = await Card.findOne({num_card: i, ...cardBody});
        if(card.status === false){
          cardsarentDelivred = true;
          break;
        }
        
      }
  
      return cardsarentDelivred;
  }

  // * Comptable Restore Cards From Regie
  
  // Ceck if regis has the cards
  const isRegieHasCards = async (from, to, cardBody) => {
  
    // * Check If Cards are with Regie
    let regieHasCards = true;
    for(let i = +from; i <= +to; i++){
      
        const data = await Card.findOne({num_card: i, status: false, owner: ROLE.REGIE, ...cardBody});
        if(!data){
          regieHasCards = false;
          break;
        }
      
    }

    return regieHasCards;

  }

  // Comptable Resotre Cards From Regie

  const comptableRestoreFromRegie = async(from, to, cardBody, req, res)=>{

    for(let i = +from; i <= +to; i++){

        await Card.findOneAndUpdate({num_card: i, ...cardBody}, { $set: { owner: req.user.role, delivredBy: "", restoredBy: req.user.role } });
    }

    // * Save Movements Entry
    const count = (+to - +from ) + 1;
    let mvEntry = new MovementEntry({from, to, unit: ROLE.REGIE, count, ...cardBody, restoredBy: req.user.role});
  
    try {
      mvEntry = await mvEntry.save();
      return res.status(200).json({ message: "Cards Restored with success bro!" });
    }
    catch (err){

      return res.status(400).json({ message: "Something wrong happened" });
    }

  }