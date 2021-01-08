const articleRouter = require("express").Router();

const { getAllArticle, setArticle, getUserArticle, getArticleByTag } = require("../controller/articleController");

articleRouter.route("/getUserArticle").get(getUserArticle);
articleRouter.route("/getAllArticle").get(getAllArticle);
articleRouter.route("/setArticle").post( setArticle); 
articleRouter.route("/getArticleByTag").get(getArticleByTag)


module.exports = articleRouter;