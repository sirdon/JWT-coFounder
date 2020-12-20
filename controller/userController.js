const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/secret.json")

const { getUserByEmail, getUserById, createUser, deleteUserById } = require("../model/userModel");

//user register request
const register = async (req, res) => {
    let { email, password, passwordCheck } = req.body;
    try {
        // check existance of fields
        if (!email || !password || !passwordCheck)
            return res.status(400).json({
                msg: "not all fields valid"
            })
        // check password same 
        if (password !== passwordCheck) {
            return res.status(400).json({
                msg: "Enter the same password twice"
            })
        }
        // check credentials already exists
        const existUser = await getUserByEmail(email);
        if (existUser) {
            return res.status(400).json({ msg: "account already exists" });
        }
        // encript the password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = {
            email: email,
            password: passwordHash
        }
        // create new user
        const savedUser = await createUser(newUser);
        res.status(200).json({
            msg: "success",
            user: savedUser
        })
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

// user login request
const login =  async (req, res) => {
    try {
        
        let { email, password } = req.body;
        // check empty fields
        if (!email || !password)
            return res.status(400).json({ msg: "not all field have entered" });
            
        // check existance of user
        const user = await getUserByEmail(email);
        if (!user)
            return res.status(400).json({ msg: "no account exists" });
        
        // check user credentails
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentails." });
        }
        // create session token for login user
        const token = jwt.sign({ id: user.id }, JWT_SECRET,{ expiresIn: 60*24});
        
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// user delete request
const deleteUser =   async (req, res)=>{
    try {
        // delete user
        const deletedUser = await deleteUserById(req.user)
        res.status(200).json({ deletedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// user token validation request
const validateToken =  async (req, res) =>{
    try {
        // check existance of token 
        const token = req.header("x-auth-token")
        if(!token) return res.json(false)
        // verify validity of token
        const verified = jwt.verify(token, JWT_SECRET);
        if(!verified) return  res.json(false)
        // verify the validity of token for user
        const user = await getUserById(verified.id);
        if(!user) return  res.json(false)

        res.json(true)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// request to get user using session token
const getLoggedInUserInfo =   async (req, res)=>{
    // get user by id
    const user = await getUserById(req.user);
    res.json(user);
}

module.exports.register = register;
module.exports.login = login;
module.exports.deleteUser= deleteUser;
module.exports.validateToken= validateToken;
module.exports.getLoggedInUserInfo= getLoggedInUserInfo;