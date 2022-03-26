const {Card} = require("../models/card");
const { Unite } = require("../models/unite");


// * Total Cards Per User
exports.totalCardsPerUser = async (req, res) =>{

    const season = req.query.season; 

    totalUnitsCards = await Card.find({unit: {$exists: true}, season}).count();
    totalClientsCards = await Card.find({client: {$exists: true}, season}).count();
    totalRegieCards = await Card.find({owner: "regie", season}).count();
    totalComptableCards = await Card.find({owner: "comptable", season}).count();
    
    res.status(200).json({totalUnitsCards, totalClientsCards, totalRegieCards, totalComptableCards})

}

// * Total Cards PIE 

exports.totalCardsPie = async (req, res) => {
    const season = req.query.season;

    totalCardsEntry = await Card.find({status: false, season}).count();
    totalCarsOut = await Card.find({status: true, season}).count();

    res.status(200).json({totalCardsEntry, totalCarsOut})

}

// * Cards Sold Per Color And Discipline

exports.cardsSoldPerColorAndDiscipline = async (req, res) => {

    const season = req.query.season;

    const getColors = await Card.find({status: true, season}).distinct("color").exec();
    const getDiscipline = await Card.find({status: true, color: {$in: getColors}, season}).distinct("discipline").exec();
    const count = []
    const obj= {}
    for(let color of getColors){
        for(let discipline of getDiscipline){
            const totalCardsPerColorDiscipline = await Card.find({status: true, discipline, color, season}).count();
            count.push(totalCardsPerColorDiscipline)
            obj[color] = {...obj[color], [discipline]: totalCardsPerColorDiscipline}
        }
    }
    console.log(obj)


    res.status(200).json({getColors, getDiscipline, obj, count});

}


// * Cards Sold Per Discipline And Price

exports.cardsSoldPerDisciplineAndPrice = async (req, res) => {

    const season = req.query.season;

    const getDiscipline = await Card.find({status: true, season}).distinct("discipline").exec();
    const getPrice = await Card.find({status: true, discipline: {$in: getDiscipline}, season}).distinct("price").exec();
    const count = []
    const obj= {}

    for(let discipline of getDiscipline){
        for(let price of getPrice){
            const totalCardsPerDisciplinePrice = await Card.find({status: true, discipline, price, season}).count();
            count.push(totalCardsPerDisciplinePrice)
            obj[discipline] = {...obj[discipline], [price]: totalCardsPerDisciplinePrice}
        }
    }

    res.status(200).json({getDiscipline, getPrice, obj, count});

}

// * Total Colors Sold Per Discipline And Price
exports.totalCardsSoldPerDisciplineAndPrice = async (req, res) => {

    const season = req.query.season

    let totalCardPrice = await Card.aggregate([
        {
            $match: {status: true, season}
        },
        {
            $group: {
                _id: null,
                totalPrice: {$sum: "$price"}   
            }
    }

    ]);

    
    totalCardPrice = totalCardPrice.length > 0 ? totalCardPrice[0].totalPrice: 0;

    const totalCardsSold = await Card.aggregate([
        {
            $match: {status: true, season}
        },

        {
        $group: {
            _id: "$discipline",
            totalPrice: {$sum: "$price"}   
        }
    },   
])
    res.status(200).json({totalCardsSold, totalCardPrice });
}

// * Total Cards Per units 

exports.totalCardsPerUnits = async (req, res) => {
const season = req.query.season;
    let total = await Unite.find({$where: "this.cards.length > 0"}).populate({
        path: "cards",
        match: {season},
        select: "season"
    }).select("name_unite");
 
    let totalCardsPerUnit = []
    total.forEach((item) => item.cards.length > 0 && totalCardsPerUnit.push({name: item.name_unite, total: item.cards.length}))

    res.status(200).json({totalCardsPerUnit})

}