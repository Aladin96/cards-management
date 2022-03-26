const _ = require("lodash");
const { Card } = require("../models/card");
const { Unite } = require("../models/unite");
const { MovementOut } = require("../models/movement_out");
const { MovementEntry } = require("../models/movement_entry");
const ROLE = require("../permission/roleEnum");
const { Client } = require("../models/client");

exports.deliverCards = async (req, res) => {

    //  ! Check if CARDS exists.
    const cardExsists = await areCardsExists(req);

    if (cardExsists.length == 0)
      return res.status(400).json({ message: "Ces CARTES n'existent pas !" });
  
    // ! Check if CARDS already delivred
  
    const cardsDelivred  = await areDelivred(req);
    if(cardsDelivred)
      return res.status(400).json({message: "Ces cartes ont deja livrer "});
  
  
    // * Ready to deliver cards
  
    // Get from req.body
    const cardBody = _.pick(req.body, [
      "color",
      "price",
      "discipline",
      "start_date",
      "end_date",
      "season"
    ]);
  
    const [owner, owner_id, cardsTo] = req.body.unit.split("|")

  
    // * Comptable Deliver cards to Regie
    if(req.user.role == ROLE.COMPTABLE && owner == ROLE.REGIE){

      // * check IF Comptable Has The Cards First
      const hasCards = await deliverHasCards(req.body.from, req.body.to, cardBody, ROLE.COMPTABLE)
      if(hasCards){
        // * Start Delivering cards to REGIE
        return comptableToRegie(req.body.from, req.body.to, cardBody, owner, req, res)
      }    
      else{
        return res.status(403).json({ message: "You dont have permission yet to deliver these cards check out with the Regie" }) 
      }
    }
      

  // * Regie Deliver Cards To UNITS or CLIENTS
    if(req.user.role == ROLE.REGIE){
      // * check IF Regie Has The Cards First
      const hasCards = await deliverHasCards(req.body.from, req.body.to, cardBody, ROLE.REGIE)
      if(hasCards){
        // * Start Delivering cards to UNITS or CLIENTS
        return deliverCardsToUnit(req.body.from, req.body.to, cardBody, owner, owner_id, cardsTo, req, res);
      }
        
      else{
 
        return res.status(403).json({ message: "You dont have permission yet to deliver these cards check out with the Comptable" }) 
      }
       
    }  

  
    //res.status(200).json({ message: "Cards delivred with success bro!" });
  }

  // Functions

// *  Check if cards exists 

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
  
  //* Check if cards already delivred 
  
  async function areDelivred(req, callback){
    let cardsDelivred = false;
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
        if(card.status === true){
          cardsDelivred = true;
          break;
        }
        
      }
  
      return cardsDelivred;
  }

  // * Comptable Deliver Cards to Regie [ An Entry Movement ]

  const comptableToRegie = async (from, to, cardBody, owner, req, res) => {
    for (let i = +from; i <= +to; i++) {
      
        await Card.findOneAndUpdate({num_card: i, ...cardBody}, { $set: {status: false, owner}});
      
    }
    // * Save Movements Entry
    const count = (+to - +from ) + 1;
    let mvEntry = new MovementEntry({from, to, unit: owner, count, ...cardBody, restoredBy: "-"});
  
    try {
      mvEntry = await mvEntry.save();
      return res.status(200).json({ message: "Cards delivred with success bro!" });
    }
    catch (err){

      return res.status(400).json({ message: "Something wrong happened" });
    }
  }

  // * Deliver Cards to Units OR Clients

  const deliverCardsToUnit = async (from, to, cardBody, owner, ownerID, cardsTo, req, res) => {
    for (let i = +from; i <= to; i++) {
      
      // * Deliver To units
      if(cardsTo === "unit"){
        const card = await Card.findOneAndUpdate({num_card: i, ...cardBody}, { $set: {status: true, owner, unit: ownerID }});
        const unitById = await Unite.findById(ownerID);
        unitById.cards.push(card);
        await unitById.save();
      }
      
      //* Deliver To Clients
      if(cardsTo === "client"){
        const card = await Card.findOneAndUpdate({num_card: i, ...cardBody}, { $set: {status: true, owner, client: ownerID }});
        const clientByID = await Client.findById(ownerID);
        clientByID.cards.push(card);
        await clientByID.save();
      }

    
  }
    // * Save Movements Out
    const count = (+to - +from ) + 1;
    let mvOut = new MovementOut({from, to, unit: owner, count, ...cardBody, delivredBy: req.user.role});

    try {
      mvOut = await mvOut.save();
      return res.status(200).json({ message: "Cards delivred with success bro!" });
    }
    catch (err){
      console.log(err)
      return res.status(400).json({ message: "Something wrong happened" });
    }

  }
  
  // * Check if The deliver (Regie Or Comtable) has the permission to deliver cards

  const deliverHasCards = async (from, to, cardBody, owner) => {

    let hasCards = true;
    for(let i= +from; i<= +to; i++){

      const card = await Card.findOne({num_card: i, ...cardBody, status: false, owner});
    
      if(!card){
        hasCards = false;
        break;
      }
        
    }

    return hasCards;
  }