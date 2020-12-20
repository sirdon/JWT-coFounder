const express = require("express");
const cors = require("cors");
require("dotenv").config();

//set up express

const app = express();
app.use(express.json());
app.use(cors());

//run server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`server running at ${PORT}`)
});

//set up routes

app.use("/api/users",require("./routes/userRouter"));
