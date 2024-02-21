const router = require("express").Router();
const {User, validate} = require("../models/user");
const bycrypt = require("bcrypt");


router.post("/register", async(req,res)=>{
    try{
        const {error} = validate(req.body);
        if(error){
            return res.status(400).send({message:error.details[0].message});
        }
        else{
            const user = await User.findOne({email:req.body.email});
            if(user == true){
                return res.status(409).send({message:"Email already registerd"});
            }
        const salt = await bycrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bycrypt.hash(req.body.password,salt);

        await new User({...req.body, password:hashPassword}).save();
        res.status(201).send({message:"User created successfully"})
        }
    }catch(error){
        res.status(500).send({message:`internal server error${error}`});
    }
})






module.exports = router;