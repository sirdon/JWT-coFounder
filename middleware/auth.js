const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/secret.json")
const auth = (req,res, next)=>{
    const token = req.header("x-auth-token");
    try {
        // check existance of token
        if(!token){
            return res.status(401).json({ msg: "no authentication token"});
        };
        // verify the validity of token
        const verified = jwt.verify(token, JWT_SECRET);
        if(!verified){
            return res.status(401).json({ msg: "token verification failed"});
        }
        req.user = verified.id;
        next();
    } catch (error) {
        res.status(500).json({error:error.message})
    }

}

module.exports.auth = auth;