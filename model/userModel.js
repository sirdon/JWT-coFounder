const connection = require("../connection/connection")
const { v4: uuidv4 } = require('uuid');

// get user info from database by email
const getUserByEmail =  (email)=>{
    return new Promise(function (resolve, reject){
        connection.query(`SELECT * from user where email="${email}"`,function (err, res){
            if(err) {
                reject(err)
                return;
            }else{
                resolve(res[0]);
            }
        });
    })
}
// get user info from database by id
const getUserById = (id)=>{
    return new Promise(function (resolve, reject){
        connection.query(`SELECT id,email FROM user WHERE id="${id}"`,function (err, res){
            if(err) {
                reject(err)
                return;
            }else{
                resolve(res[0])
            }
        })
    })
}
// create user into database
const createUser =  (newUser)=>{
    return new Promise(function (resolve, reject){
        // get unique id 
        const id = uuidv4();
        newUser.id = id;
        connection.query(`INSERT INTO user SET ?`,newUser, function(err, res){
            if(err) {
                reject(err)
                return;
            }else{
                resolve(res);
            }
        })
    })
}
// delere user info from database
const deleteUserById = (user)=>{
    return new Promise(function (resolve, reject){
        connection.query(`DELETE from user WHERE id="${user}"`,function (err, res){
            if(err) {
                reject(err)
                return;
            }else{
                resolve(res);
            }
        });
    })
}

module.exports.getUserByEmail = getUserByEmail;
module.exports.getUserById = getUserById;
module.exports.createUser= createUser;
module.exports.deleteUserById = deleteUserById;