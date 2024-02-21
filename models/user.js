const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity").default;



const UserSchema = new mongoose.Schema(
    {
        username:{type:String , required:true, unique:true},
        email:{type:String , required:true, unique:true},
        password:{type:String , required:true},
        firstname:{type:String , required:true, unique:false},
        lastname:{type:String , required:true, unique:false},
    },{timestamps:true});

    UserSchema.methods.generateAuthToken = function(){
        const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn: "7d"});
        return token
    };

const User = mongoose.model("user",UserSchema)

const validate = (data) =>{

    const schema = Joi.object({
        username:Joi.string().required().label("UserName"),
        firstname:Joi.string().required().label("First Name"),
        lastname:Joi.string().required().label("Last Name"),
        email:Joi.string().email().required().label("Email"),
        password:Joi.string().min(8).max(30).required().label("Password"),
    });

    return schema.validate(data)
};

    module.exports = {User, validate};