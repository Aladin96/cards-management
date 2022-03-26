const {Client} = require("../models/client");


// * Get units
exports.getClients = async (req, res) => {

  try {
    const clients = await Client.find({}).select("first_name last_name birthday _id")
    res.status(200).json(clients);

  } catch (err) {
    res.status(404).json({ message: "Erreur !" });
  }
}

// * Add Client

exports.addClient = async (req, res) => {
    const {first_name, last_name, birthday, gender} = req.body;

    let newClient = new Client({first_name, last_name, birthday, gender});

    try{
        newClient = await newClient.save();
        return res.status(200).json({message: "Client added With success"});
    }catch(err){
        return res.status(400).json({message: "Something wrong happened !"});
    }

}
// * Browse Client 

exports.browseClients = async (req, res) => {
  
    try {
        const page = +req.query.page || 1;
        const pageSize = +req.query.limit || 50;
        const items = (page - 1) * pageSize;
    
        const total = await Client.count();
        const pages = Math.ceil(total / pageSize)
    
        const clients = await Client.find()
          .skip(items)
          .limit(pageSize)
          .sort("-createdAt");
    
        res.status(200).json({ clients, total, pages, pageSize });
      } catch (err) {
        res.status(404).json({ message: "No Clients" });
      }
}
// * Check IF CLIENT already exists 

