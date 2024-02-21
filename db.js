const mongoose = require("mongoose");

module.exports = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try{
        mongoose.connect(process.env.DB, connectionParams);
        console.log("Connected to DB")
    }catch(error){
        console.log("Could not connect to DB");
        console.log(error);
    }
}


