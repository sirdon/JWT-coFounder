const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//set up express

const app = express();
app.use(express.json());
app.use(cors());

// set up mongoose
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(err) throw err.message;
    console.log("mongoDB connection established")
});
//run server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`server running at ${PORT}`)
});

//heroku 
// if(process.env.NODE_ENV === 'production'){

//     app.use(express.static('auth-frontend/build'));
// }


//set up routes

app.use("/api/users",require("./routes/userRouter"));
app.use("/api/article",require("./routes/articleRouter"));
