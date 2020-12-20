const userRouter = require("express").Router();

const { register, login, deleteUser, validateToken, getLoggedInUserInfo } = require("../controller/userController");
const { auth } = require("../middleware/auth")

userRouter.route("/login").post(login);
userRouter.route("/register").post(register);
userRouter.route("/delete").delete(auth, deleteUser); // frontend not implemented
userRouter.route("/tokenIsValid").post(validateToken);
userRouter.route("/").get(auth, getLoggedInUserInfo);

module.exports = userRouter;