const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const connection = require("./db");

dotenv.config();




connection();




app.use(express.json())
app.use(cors());

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");




app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);


const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Backend server is running on port ${port}!`);
});
