const userRouter = require("express").Router();

const { signUp, login, deleteUser, validateToken, getLoggedInUserInfo } = require("../controller/userController");
const { auth } = require("../middleware/auth")

userRouter.route("/login").post(login);
userRouter.route("/signUp").post(signUp);
userRouter.route("/delete").delete(auth, deleteUser); 
userRouter.route("/tokenIsValid").post(validateToken);
userRouter.route("/").get(auth, getLoggedInUserInfo);

module.exports = userRouter;