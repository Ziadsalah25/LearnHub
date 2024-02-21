const router = require("express").Router();
const {User} = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/login",async(req,res)=>{
    try{
        const{error} = validate(req.body);
        if(error == true){
            return res.status(400).send({message:error.details[0].message});
        }
        else{
            const user = await User.findOne({email:req.body.email});
            if(!user){
                return res.status(401).send({message:"Invaild Email or Password"})
            };
            const vaildPassword = await bcrypt.compare(
                req.body.password, user.password
            );
            if(!vaildPassword){
                return res.status(401).send({message:"Invaild Email or Password"})
            };

            const token = user.generateAuthToken();
            res.status(200).send({data:token, message:"Loggen in successfully"})
        }
    }catch(error){
        res.status(500).send({message:`internal server error${error}`});
    }
})

const validate = (data) =>{

    const schema = Joi.object({
        username:Joi.string().required().label("UserName"),
        firstname:Joi.string().required().label("First Name"),
        lastname:Joi.string().required().label("Last Name"),
        email:Joi.string().email().required().label("Email"),
        password:Joi.string().required().label("Password"),
    });

    return schema.validate(data)
};

module.exports = router;