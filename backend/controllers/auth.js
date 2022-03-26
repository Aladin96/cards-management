const mongoose = require("mongoose");
const { User } = require("../models/user")

const invalidAuthMessage = "Pseudo ou Mot de passe incorrect";

// * Create Account
exports.createAccount = async (req, res, next) => {
    const { name, password, role } = req.body;


    /*if(!isAdmin(req.user))
        return res.status(401).json({message: "Not authorized"})*/

    let newUser =  new User({name, password, role, status:true});
    try{
        
        newUser = await newUser.save();
        res.status(200).json({message: "User Created with succes", newUser});

    }catch(err){
        console.log(err)
        res.status(400).json({message: "Something wrong happened"});
    }
}

// * Login 

exports.login = async (req, res, next) => {
    const { name, password } = req.body;

    if(!name || !password )
        return res.status(400).json({message: invalidAuthMessage});

   try{

    const user = await User.findOne({name}).select("+password");
    const isMatch = await user.isPasswordMatch(password.toString());

    if(!user || !isMatch)
        return res.status(400).json({message: invalidAuthMessage});

    sendToken(user, 200, res);  

   }catch(err){
       return res.status(400).json({message: invalidAuthMessage})
   }     

}

// * get Users
exports.accounts = async (req, res, next) => {

    try{
        const users = await User.find({}).select("+password").count();
        res.status(200).json({message: "users", users});
    }catch(err){
        res.status(400).json({message: "Une erreur est survenu essayez de nouveau!"});
    }
    

}

// * isAuth 

// functions 

// Send TOKEN JWT 
const sendToken = (user, statusCode, res) => {

    const token = user.getSignedToken();
    res.status(statusCode).json({token})

}

// Check roles
// * is Admin 
const isAdmin = (user) => user.role === 'Admin';
// * is Comptable 
const isComptable = (user) => user.role === 'comptable';
