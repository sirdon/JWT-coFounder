const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const mongoose = require("mongoose")
// user login request
const getUserArticle = async (req, res) => {
    //get user's articles from db
    const userId = req.header("id");
    try {
        const articleList = await User.
        aggregate([
            {$unwind: "$articleList"},
            {$match:{_id:mongoose.Types.ObjectId(userId)}},
            {$project:{_id:1,articleList:1}},
            {$sort:{"articleList.createdDate":-1}}
        ])
       
        res.status(200).json({
            msg: "success",
            user: articleList
        })
        console.log(articleList)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const setArticle = async (req, res) => {
    //insert article into user's articleList
    const {id, title, articleText, tags } = req.body;
    const createdDate =  new  Date();
    const article = { title, articleText, tags, createdDate };
    try {
        const saveRes = await User.updateOne({_id:id},{$push:{articleList:article}});
        res.status(200).json({
            msg: "success",
            user: saveRes
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// user login request
const getAllArticle = async (req, res) => {
    //get user's articles from db
    try {
        const articleList = await User.
        aggregate([
            {$unwind: "$articleList"},
            {$project:{_id:1,articleList:1}},
            {$sort:{"articleList.createdDate":-1}}
        ])
       
        res.status(200).json({
            msg: "success",
            user: articleList
        })
        console.log(articleList)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getArticleByTag = async (req, res) => {
    //get user's articles from db
    const tag = req.header("tag");
    try {
        const articleList = await User.
        aggregate([
            {$unwind: "$articleList.tags"},
            {$match:{"articleList.tags":"$tag"}},
            {$project:{_id:1}},
            {$sort:{"articleList.createdDate":-1}}
        ])
        res.status(200).json({
            msg: "success",
            user: articleList
        })
        console.log(articleList)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports.getArticleByTag = getArticleByTag;
module.exports.getAllArticle = getAllArticle;
module.exports.getUserArticle = getUserArticle;
module.exports.setArticle = setArticle;