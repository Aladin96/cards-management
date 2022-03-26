const { verify } = require("jsonwebtoken");
const { User } = require("../models/user");

exports.requireAuth = async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token)
        return res.status(403).json({message: "Forbidden"});

    try{
        const decoded = verify(token, process.env.JWT_SECRET);
       
        const user = await User.findById(decoded.id);        
            
        if(!user)
            return res.status(404).json({message: "No user found !"})

       req.user = user;
       next();     
    }catch(err){
        console.log(err)
        return res.status(401).send({message: "Not authorizated", statusCode: 401});
    }

}