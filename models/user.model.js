const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true},
    username:{type:String, required:true},
    name:{type:String, required:true},
    age:{type:Number, required:true},
    articleList:[]
});

module.exports = User = mongoose.model("user", userSchema);