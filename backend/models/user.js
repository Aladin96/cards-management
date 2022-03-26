const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    role: { type: String, required: true }, // [admin, comptable, regie]
    status: { type: Boolean, required: true }, // [admin, comptable, regie]
    password: {type: String, required: true, select: false },
    resetPasswordToken: String,
    resetPasswordExpire: Date

});


userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

});

userSchema.methods.isPasswordMatch = async function(password){
    const compare = await bcrypt.compare(password, this.password);
    return compare;

}

userSchema.methods.getSignedToken = function(){
    
    const payload = {id: this._id, name: this.name, role: this.role, status: this.status};
    const secret = process.env.JWT_SECRET

    return jwt.sign(payload, secret, {expiresIn: process.env.JWT_EXPIRE})
}
const User = mongoose.model("User", userSchema);


exports.User = User;